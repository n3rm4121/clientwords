import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import TestimonialCard from '@/models/testimonial-card.model';
import { auth } from '@/auth';
import { testimonialCardSchema } from '@/schemas/testimonialCardSchema';
import Space from '@/models/space.model';



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
            spaceId: formData.get('spaceId') as string,
            spaceName: formData.get('spaceName') as string
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
            spaceId: formData.get('spaceId'),
            spaceName: formData.get('spaceName')
        });
        await testimonialCard.save(); 


        // set isNewSpace to false
        const space = await Space.findOne({ _id: formData.get('spaceId') });

        space.isNewSpace = false;
        await space.save();

         
    } catch (error) {
        console.error('Testimonial card creation error:', error);
        return NextResponse.json({error: error}, {status : 500});
        
    }


    return NextResponse.json({message: 'Testimonial card created'});
})


export const PUT = auth(async function PUT(request){
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
            spaceId: formData.get('spaceId') as string,
            spaceName: formData.get('spaceName')
        };

        // Validate data using Zod schema
        const parsedData = testimonialCardSchema.parse(data);
     
        if(!parsedData){
            return NextResponse.json({error: 'Invalid data'}, {status : 400});
        }
        
        const testimonialCard = await TestimonialCard.findOne({ spaceId: formData.get('spaceId') });

        testimonialCard.companyName = formData.get('companyName');
        testimonialCard.companyLogo = formData.get('companyLogo');
        testimonialCard.companyURL = formData.get('companyURL');
        testimonialCard.placeholder = formData.get('placeholder');
        testimonialCard.promptText = formData.get('promptText');
        testimonialCard.spaceId = formData.get('spaceId');
        testimonialCard.spaceName = formData.get('spaceName');
        await testimonialCard.save(); 

        return NextResponse.json({message: 'Testimonial card updated'});
         
    } catch (error) {
        console.error('Testimonial card update error:', error);
        return NextResponse.json({error: error}, {status : 500});
        
    }
})




