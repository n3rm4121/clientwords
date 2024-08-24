// // endpoint to send testimonial
// get too

import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/testimonials.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/auth';

// public route so no need to authenticate

export async function POST(request: Request) {

    await dbConnect();

    try {
        
        const { userName, userAvatar, userIntro, message, spaceId } = await request.json();

        // Save the testimonial to the database
        const testimonial = new Testimonial({
            userName,
            userAvatar,
            userIntro,
            message,
            spaceId,
        });

        await testimonial.save();
        
        if(!testimonial){
            return NextResponse.json({error: 'Invalid data'}, {status : 400});
        }


        return NextResponse.json({ message: 'Testimonial submitted successfully', testimonial }, { status: 200 });
       

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


