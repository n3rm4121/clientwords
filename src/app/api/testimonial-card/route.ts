import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import TestimonialCard from '@/models/testimonial-card.model';

export async function POST(request: Request){
    await dbConnect();
    try {
        const formData = await request.formData();
     
        const testimonialCard = new TestimonialCard({
            companyName: formData.get('companyName'),
            companyLogo: formData.get('companyLogo'),
            companyURL: formData.get('companyURL'),
            placeholder: formData.get('placeholder'),
            promptText: formData.get('promptText'),
        });
        // await testimonialCard.save(); 
            console.log(testimonialCard);
    } catch (error) {
        console.error('Testimonial card creation error:', error);
        return NextResponse.json({error: error}, {status : 500});
        
    }


    return NextResponse.json({message: 'Testimonial card created'});
}


export async function GET(request: Request){
    await dbConnect();
    try {
        const testimonialCards = await TestimonialCard.find();
        return NextResponse.json(testimonialCards);
    } catch (error) {
        console.error('Testimonial card fetch error:', error);
        return NextResponse.json({error: error}, {status : 500});
    }
}

