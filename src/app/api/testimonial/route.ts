import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/testimonials.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/auth';
import { uploadOnCloudinary } from "@/lib/cloudinary";
import { testimonailSchema } from "@/schemas/validationSchema";
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';


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

// Initialize Upstash Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL, // Your Upstash Redis REST URL
    token: process.env.UPSTASH_REDIS_REST_TOKEN, // Your Upstash Redis Authorization Token
});

// Create a new rate limiter
const rateLimiter = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, '10 m'), // 1 request per 10 minutes per IP
    analytics: true, // Optional: enables analytics
    ephemeralCache: undefined, // Optional: enables ephemeral cache
    timeout: undefined,
});

export async function POST(request: NextRequest) {

    await dbConnect();
    const ip = request.ip ?? request.headers.get('X-Forwarded-For') ?? 'unknown';
    const { success, limit, remaining, reset } = await rateLimiter.limit(ip);

    if (!success) {
        return NextResponse.json({ error: 'Too many requests, please try again later.' }, {
            status: 429, headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': reset.toString(),
            },
        },);
    }

    try {

        const formData = await request.formData();
        const recaptchaToken = formData.get('recaptchaToken') as string;
        if (!recaptchaToken) {
            return NextResponse.json({ error: 'reCAPTCHA token is missing' }, { status: 400 });
        }
        const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
        if (!secretKey) {
            console.error('reCAPTCHA secret key is not defined');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }
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


        if (!formData) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }
        const userAvatar = formData.get('userAvatar') as File;

         if(!userAvatar){
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

        const parsedData = testimonailSchema.parse(data);


        const newTestimonial = await Testimonial.create(parsedData);
         

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

        const testimonials = await Testimonial.find({ spaceId }).sort({ createdAt: -1 });

        return NextResponse.json({ testimonials }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching the testimonials' }, { status: 500 });
    }

})


