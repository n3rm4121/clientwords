import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/testimonials.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/auth';
import { uploadOnCloudinary } from "@/lib/cloudinary";
import { testimonailSchema } from "@/schemas/validationSchema";
import { testimonialSubmitRateLimit } from "@/utils/rateLimit";
import Space from "@/models/space.model";
import User from "@/models/user.model";
import { canCollectTestimonial } from "@/lib/featureAccess";
import LoveGallery from "@/models/loveGallery.model";
import config from "@/config";


async function uploadUserAvatar(file: File): Promise<string> {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.type)) {
        throw new Error('Invalid image type. Allowed types are JPEG, PNG, and GIF.');
    }

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeInBytes) {
        throw new Error('Image size exceeds 2MB limit.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudinaryResponse = await uploadOnCloudinary(buffer, file.type);
    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        throw new Error('Failed to upload image to Cloudinary.');
    }

    return cloudinaryResponse.secure_url;
}

export async function POST(request: NextRequest) {

    await dbConnect();

    if (config.upstashRedis) {
        console.log("here")
        const rateLimitResponse = await testimonialSubmitRateLimit(request, 2, '10 m');
        if (rateLimitResponse) return rateLimitResponse;
    }

    try {
        const formData = await request.formData();

        // recaptcha verification only in production
        if (config.recaptcha) {
            const recaptchaToken = formData.get('recaptchaToken') as string;
            if (!recaptchaToken) {
                return NextResponse.json({ error: 'reCAPTCHA token is missing' }, { status: 400 });
            }
            const secretKey = config.recaptcha.secretKey;
            const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

            try {
                const recaptchaResponse = await fetch(verificationUrl, { method: 'POST' });
                const recaptchaData = await recaptchaResponse.json();

                if (!recaptchaData.success) {
                    return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
                }
            } catch (error) {
                console.error('reCAPTCHA verification error:', error);
                return NextResponse.json({ error: 'An error occurred while verifying reCAPTCHA' }, { status: 500 });
            }
        }

        if (!formData) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const userAvatar = formData.get('userAvatar') as File;
        if (!userAvatar) {
            return NextResponse.json({ error: 'Avatar is required' }, { status: 400 });
        }

        let cloudinaryURL: string;
        try {
            cloudinaryURL = await uploadUserAvatar(userAvatar);
        } catch (error) {
            return NextResponse.json({ error: error }, { status: 400 });
        }

        const data = {
            userName: formData.get('userName') as string,
            userAvatar: cloudinaryURL,
            userIntro: formData.get('userIntro') as string,
            message: formData.get('message') as string,
            spaceId: formData.get('spaceId') as string,
        };

        const space = await Space.findById(data.spaceId);
        const parsedData = testimonailSchema.parse(data);
        parsedData.owner = space?.owner;
        parsedData.spaceName = space?.name;

        const user = await User.findById(parsedData.owner).select('subscriptionTier').exec();
        const can = canCollectTestimonial(user.subscriptionTier, space.testimonials?.length || 0);
        if (!can) {
            return NextResponse.json({ error: `${parsedData.spaceName} has reached the limit of collecting testimonials` }, { status: 400 });
        }

        const newTestimonial = await Testimonial.create(parsedData);

        if (!space) {
            return NextResponse.json({ error: 'Space not found' }, { status: 404 });
        }

        space.testimonials.push(newTestimonial._id);
        await space.save();

        if (!newTestimonial) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Testimonial submitted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Testimonial creation error:', error);
        return NextResponse.json({ error: 'An error occurred while submitting the testimonial' }, { status: 500 });
    }
}



export const GET = auth(async function GET(request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const spaceId = searchParams.get('spaceId');
        const query = searchParams.get('query') || '';
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '9', 10);

        const skip = (page - 1) * limit;

        const searchQuery = {
            spaceId,
            $or: [
                { userName: { $regex: query, $options: 'i' } },
                { message: { $regex: query, $options: 'i' } }
            ]
        };

        const [testimonials, total] = await Promise.all([
            Testimonial.find(searchQuery)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Testimonial.countDocuments(searchQuery)
        ]);

        const lovedTestimonials = await LoveGallery.find({ spaceId }).select('testimonials').exec();

        const lovedIds = lovedTestimonials.flatMap((lovedTestimonial) => lovedTestimonial.testimonials.map((id: any) => id.toString()));

        const response = testimonials.map((testimonial) => ({
            ...testimonial.toObject(),
            isLoved: lovedIds.includes(testimonial._id.toString()),
        }));

        return NextResponse.json({ testimonials: response, total, page, limit }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching the testimonials' }, { status: 500 });
    }
});

