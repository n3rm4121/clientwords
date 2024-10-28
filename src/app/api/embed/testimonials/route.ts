import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '@/models/testimonials.model';
import dbConnect from '@/lib/dbConnect';
import { Redis } from '@upstash/redis';
import LoveGallery from '@/models/loveGallery.model';
import { iframeFetchRateLimit } from '@/utils/rateLimit';
import config from '@/config';

let redis: Redis | null = null;

if (config.upstashRedis) {
    const url = config.upstashRedis.restUrl;
    const token = config.upstashRedis.restToken;

    redis = new Redis({
        url: url,
        token: token,
    });

} else {
    console.warn('Redis is not configured. Skipping Redis setup.');
}


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

        const cacheKey = `testimonials_${spaceId}_${limit}`;
        let cachedTestimonials: any = null;

        if (redis) {
            cachedTestimonials = await redis.get(cacheKey);
        }

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

        if (!loveGallery) {
            return NextResponse.json({ testimonials: [] }, { status: 200 });
        }

        const testimonials = await Testimonial.find({ _id: { $in: loveGallery.testimonials } }).select('userName userAvatar userIntro message').exec();

        // Cache the data for 5 minutes if Redis is available
        if (redis) {
            await redis.set(cacheKey, JSON.stringify({ testimonials }), { ex: 300 });
        }

        return NextResponse.json({ testimonials }, {
            status: 200,
            headers: { 'Cache-Control': 'public, max-age=300' },
        });

    } catch (error) {
        console.error('Error fetching testimonials for embed:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the testimonials' }, { status: 500 });
    }
};
