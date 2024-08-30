import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '@/models/testimonials.model';
import dbConnect from '@/lib/dbConnect';
import { Redis } from '@upstash/redis';
import LoveGallery from '@/models/loveGallery.model';
import { iframeFetchRateLimit } from '@/utils/rateLimit';
// Initialize Redis connection
// data will be udpated every 5 minutes
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
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
        console.log('cachedTestimonials', cachedTestimonials);

        if (cachedTestimonials) {
            console.log('Cache hit');
            // Parse the cached string into JSON
            const parsedTestimonials = JSON.parse(cachedTestimonials.toString());

            return NextResponse.json(parsedTestimonials, {
                status: 200,
                headers: { 'Cache-Control': 'public, max-age=300' },
            });
        }

        // If cache miss, fetch data from MongoDB
        console.log('Cache miss');
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
