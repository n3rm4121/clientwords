import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import TestimonialCard from '@/models/testimonial-card.model';
import { auth } from '@/auth';
import { testimonialCardSchema } from '@/schemas/testimonial';
import Space from '@/models/space.model';
import { deleteFromCloudinary, uploadOnCloudinary } from '@/lib/cloudinary';
export const bodyParser = false

// TODO: check if the user is a pro user and allow them to create more than 1 testimonial card
// TODO:: Attach the testimonial card to a space
export const  POST = auth(async function POST(request){
    await dbConnect();
    
    if(!request.auth){
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    try {
      
        const formData = await request.formData();
      
        const companyLogo = formData.get('companyLogo') as File
    

        const fileBuffer = Buffer.from(await companyLogo.arrayBuffer())
     

        const cloudinaryResponse = await uploadOnCloudinary(fileBuffer, companyLogo.type);
        if (!cloudinaryResponse) {
            return NextResponse.json({error: 'failed to upload image'}, {status: 400})
          }


          const cloudinaryURL = cloudinaryResponse.secure_url;
          


        const data = {
            companyName: formData.get('companyName') as string,
            companyURL: formData.get('companyURL') as string,
            companyLogo: cloudinaryURL,
            avatar: formData.get('avatar') as string,
            promptText: formData.get('promptText') as string,
            placeholder: formData.get('placeholder') as string,
            spaceId: formData.get('spaceId') as string,
            spaceName: formData.get('spaceName') as string
          };

        const parsedData = testimonialCardSchema.safeParse(data);
     
        if(!parsedData){
            return NextResponse.json({error: 'Invalid data'}, {status : 400});
        }
        
        const testimonialCard = new TestimonialCard(parsedData.data);
        await testimonialCard.save(); 


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
        
        const companyLogo = formData.get('companyLogo') as File;
        const fileBuffer = Buffer.from(await companyLogo.arrayBuffer())
        const cloudinaryResponse = await uploadOnCloudinary(fileBuffer, companyLogo.type);
        if (!cloudinaryResponse) {
            return NextResponse.json({error: 'failed to upload image'}, {status: 400})
          }
        const cloudinaryURL = cloudinaryResponse.secure_url;
       

        const data = {
            companyName: formData.get('companyName') as string,
            companyURL: formData.get('companyURL') as string,
            companyLogo: cloudinaryURL,
            avatar: formData.get('avatar') as string,
            promptText: formData.get('promptText') as string,
            placeholder: formData.get('placeholder') as string,
            spaceId: formData.get('spaceId') as string,
            spaceName: formData.get('spaceName')
        };

        const parsedData = testimonialCardSchema.parse(data);
     
        if(!parsedData){
            return NextResponse.json({error: 'Invalid data'}, {status : 400});
        }
        
        const existingTestimonialCard = await TestimonialCard.findOne({spaceId: formData.get('spaceId')});
        if(!existingTestimonialCard){
            return NextResponse.json({message: 'No testimonial card found'}, {status: 404})
        }
        // delete the existing image from cloudinary
        // "https://res.cloudinary.com/dekrwkiyp/image/upload/v1724426355/testimonials/companyLogo/uts41rapxwfk3fkullu3.png"

        let publicId = existingTestimonialCard.companyLogo.split('/').slice(-3).join('/').split('.')[0];
        console.log("publicId: ", publicId);
        deleteFromCloudinary(publicId);

        existingTestimonialCard.companyName = parsedData.companyName;
        existingTestimonialCard.companyURL = parsedData.companyURL;
        existingTestimonialCard.companyLogo = parsedData.companyLogo;
        existingTestimonialCard.promptText = parsedData.promptText;
        existingTestimonialCard.placeholder = parsedData.placeholder;

        await existingTestimonialCard.save();

        return NextResponse.json({message: 'Testimonial card updated', existingTestimonialCard});
         
    } catch (error) {
        console.error('Testimonial card update error:', error);
        return NextResponse.json({error: error}, {status : 500});
        
    }
})



export const GET = auth(async function GET(request) {

    const spaceId = request.url.split('=')[1];

    if(!spaceId){
        return NextResponse.json({message: 'No spaceId provided'}, {status: 400})
    }

   await dbConnect();
    if(!request.auth){
        return NextResponse.json({message: "Not authenticated"}, {status: 403})
    }

    try{
        const testimonialCard = await TestimonialCard.findOne({
            spaceId: spaceId
        })

        if(!testimonialCard){
            return NextResponse.json({message: 'No testimonial card found'}, {status: 404})
        }
        return NextResponse.json({message: 'Successfully fetched testimonial card', testimonialCard})

    }catch(error){
        console.error('Error fetching testimonial card:', error);
        return NextResponse.json({error: error}, {status: 500})
    }
})


