import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import TestimonialCard from '@/models/testimonial-card.model';
import { auth } from '@/auth';
import { testimonialCardSchema } from '@/schemas/testimonialCardSchema';

// export const GET = auth(function GET(req) {
//   if (req.auth) return NextResponse.json(req.auth)
//   return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
// })

// TODO: check if the user is a pro user and allow them to create more than 1 testimonial card
// TODO:: Attach the testimonial card to a space
export const  POST = auth(async function POST(request){
    await dbConnect();

    if(!request.auth){
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    try {
      
        const formData = await request.formData();
        const data = {
            companyName: formData.get('companyName') as string,
            companyURL: formData.get('companyURL') as string,
            companyLogo: formData.get('companyLogo') as string,
            avatar: formData.get('avatar') as string,
            promptText: formData.get('promptText') as string,
            placeholder: formData.get('placeholder') as string,
        };

        // Validate data using Zod schema
        const parsedData = testimonialCardSchema.parse(data);
     
        if(!parsedData){
            return NextResponse.json({error: 'Invalid data'}, {status : 400});
        }
        
        const testimonialCard = new TestimonialCard({
            companyName: formData.get('companyName'),
            companyLogo: formData.get('companyLogo'),
            companyURL: formData.get('companyURL'),
            placeholder: formData.get('placeholder'),
            promptText: formData.get('promptText'),
        });
        await testimonialCard.save(); 
         
    } catch (error) {
        console.error('Testimonial card creation error:', error);
        return NextResponse.json({error: error}, {status : 500});
        
    }


    return NextResponse.json({message: 'Testimonial card created'});
})



