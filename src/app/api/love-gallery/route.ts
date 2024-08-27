import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import LoveGallery from "@/models/loveGallery.model";
import Testimonial from "@/models/testimonials.model";
import { likeRateLimit } from "@/utils/rateLimit";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
    const rateLimitResponse = await likeRateLimit(req);
    if (rateLimitResponse) return rateLimitResponse;

    if(!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const user = req.auth?.user;
    if(!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    try {
        await dbConnect();
        const body = await req.json();
        const { testimonialId, spaceId } = body;
        
        const loveGallery = await LoveGallery.findOne({ spaceId });

        if(!loveGallery) {
            const newLoveGallery = await new LoveGallery({ spaceId, testimonials: [testimonialId] });
            await newLoveGallery.save();
            return NextResponse.json({ message: "Successfully added testimonial to love gallery", isLoved: true }, { status: 200 });
        }

        if(loveGallery.testimonials.includes(testimonialId)) {
        
            loveGallery.testimonials.pull(testimonialId);
            await loveGallery.save();
            return NextResponse.json({ message: "Successfully removed testimonial from love gallery" , isLoved: false},{ status: 200 });
        }

        loveGallery.testimonials.push(testimonialId);
        await loveGallery.save();

        return NextResponse.json({ message: "Successfully added testimonial to love gallery" , isLoved: true}, { status: 200 });
        

    } catch (error) {
        
        return NextResponse.json({ message: "Error adding testimonial to love gallery", error, isLoved: false }, { status: 500 });
    }
    

})


export const GET = auth(async function GET(req) {
    if(!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
     
    const {searchParams} = new URL(req.url);
    const spaceId = searchParams.get('spaceId');


    const user = req.auth?.user;
    if(!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    try {
        await dbConnect();
      
        const loveGallery = await LoveGallery.findOne({ spaceId });

        if(!loveGallery) {
            return NextResponse.json({ testimonials: [] }, { status: 200 });
        }

        
        const testimonials = await Testimonial.find({ _id: { $in: loveGallery.testimonials } });

        return NextResponse.json({ testimonials, lovedIds: loveGallery.testimonials }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error fetching love gallery", error }, { status: 500 });
    }
})