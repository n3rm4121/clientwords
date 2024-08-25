// // endpoint to send testimonial
// get too

import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/testimonials.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/auth';
import { uploadOnCloudinary } from "@/lib/cloudinary";
import { testimonailSchema } from "@/schemas/validationSchema";

// public route so no need to authenticate

export async function POST(request: Request) {

    await dbConnect();

    try {
        
       const formData = await request.formData();
       if(!formData){
              return NextResponse.json({error: 'Invalid data'}, {status : 400});
         }
       const userAvatar = formData.get('userAvatar') as File;

       const fileBuffer = Buffer.from(await userAvatar.arrayBuffer());

       const cloudinaryResponse = await uploadOnCloudinary(fileBuffer, userAvatar.type);

       if (!cloudinaryResponse) {
        return NextResponse.json({error: 'failed to upload image'}, {status: 400})
      }

      const cloudinaryURL = cloudinaryResponse.secure_url;

      const data = {
        userName: formData.get('userName') as string,
        userAvatar: cloudinaryURL,
        userIntro: formData.get('userIntro') as string,
        message: formData.get('message') as string,
        spaceId: formData.get('spaceId') as string,
      };

      const newTestimonial = await Testimonial.create(data);

        if(!newTestimonial){
            return NextResponse.json({error: 'Invalid data'}, {status : 400});
        }

        return NextResponse.json({ message: 'Testimonial submitted successfully', newTestimonial }, { status: 200 });
       

    } catch (error) {
        console.error('Testimonial creation error:', error);
        return NextResponse.json({ error: 'An error occurred while submitting the testimonial' }, { status: 500 });
    }
}


// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//     await dbConnect();

//     try {
//         const { spaceId } = req.query;
//         const testimonials = await Testimonial.find({ spaceId }).sort({ createdAt: -1 });

//         return NextResponse.json({ testimonials }, { status: 200 });
//     }
//     catch (error) {
//         console.error('Testimonial fetch error:', error);
//         return NextResponse.json({ error: 'An error occurred while fetching the testimonials' }, { status: 500 });
//     }
// }

export const GET = auth(async function GET(request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const spaceId = searchParams.get('spaceId');

        const testimonials = await Testimonial.find({ spaceId }).sort({ createdAt: -1 });

        return NextResponse.json({ testimonials }, { status: 200 });
    }
    catch (error) {
        console.error('Testimonial fetch error:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the testimonials' }, { status: 500 });
    }

})


