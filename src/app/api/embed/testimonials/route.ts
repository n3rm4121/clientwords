import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '@/models/testimonials.model';
import dbConnect from '@/lib/dbConnect';
import { Redis } from '@upstash/redis';
import LoveGallery from '@/models/loveGallery.model';
import { iframeFetchRateLimit } from '@/utils/rateLimit';
// Initialize Redis connection
// data will be udpated every 5 minutes
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if(!url) {
    throw new Error('Please provide a Redis URL');
}

if(!token) {
    throw new Error('Please provide a Redis Token');
}
const redis = new Redis({
    url: url,
    token: token,
});

export const GET = async (request: NextRequest) => {
    await dbConnect();

    const rateLimitResponse = await iframeFetchRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    try {
        const { searchParams } = new URL(request.url);
        const spaceId = searchParams.get('spaceId');
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        if (!spaceId) {
            return NextResponse.json({ error: 'spaceId is required' }, { status: 400 });
        }

        // Create a unique cache key
        const cacheKey = `testimonials_${spaceId}_${limit}`;

        // Attempt to retrieve cached data
        const cachedTestimonials = await redis.get(cacheKey);
       
          
        if (cachedTestimonials) {
            return NextResponse.json(cachedTestimonials, {
                status: 200,
                headers: { 'Cache-Control': 'public, max-age=300' },
            });
        }
        

        // If cache miss, fetch data from MongoDB
      
        const loveGallery = await LoveGallery.findOne({ spaceId })
        .sort({ createdAt: -1 })
        .limit(limit);

        if(!loveGallery) {
            return NextResponse.json({ testimonials: [] }, { status: 200 });
        }
        
        const testimonials = await Testimonial.find({ _id: { $in: loveGallery.testimonials } });

        // Cache the fetched data for 5 minutes
        await redis.set(cacheKey, JSON.stringify({ testimonials }), { ex: 300 });

        return NextResponse.json({ testimonials }, {
            status: 200,
            headers: { 'Cache-Control': 'public, max-age=300' },
        });

    } catch (error) {
        console.error('Error fetching testimonials for embed:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the testimonials' }, { status: 500 });
    }
};
