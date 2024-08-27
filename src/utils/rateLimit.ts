import { Redis } from '@upstash/redis';
import { Duration, Ratelimit } from '@upstash/ratelimit';
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function likeRateLimit(request: NextRequest) {
    const ip = request.ip ?? request.headers.get('X-Forwarded-For') ?? 'unknown';
    
    const perMinuteLimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(10, '1 m'),
        prefix: 'like_per_minute',
    });

    const perHourLimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(100, '1 h'),
        prefix: 'like_per_hour',
    });

    const perDayLimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(1000, '1 d'),
        prefix: 'like_per_day',
    });

    const limits = [
        await perMinuteLimit.limit(ip),
        await perHourLimit.limit(ip),
        await perDayLimit.limit(ip),
    ];

    for (const { success, limit, remaining, reset } of limits) {
        if (!success) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': limit.toString(),
                        'X-RateLimit-Remaining': remaining.toString(),
                        'X-RateLimit-Reset': reset.toString(),
                    },
                }
            );
        }
    }

    return null; // No rate limit error
}

export async function testimonialSubmitRateLimit(
    request: NextRequest,
    limit: number,
    duration: Duration
) {
    const ip = request.ip ?? request.headers.get('X-Forwarded-For') ?? 'unknown';
    const rateLimiter = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(limit, duration),
        analytics: true,
    });

    const { success, limit: rateLimit, remaining, reset } = await rateLimiter.limit(ip);

    if (!success) {
        return NextResponse.json(
            { error: `Rate limit exceeded. Please try again later.` },
            {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': rateLimit.toString(),
                    'X-RateLimit-Remaining': remaining.toString(),
                    'X-RateLimit-Reset': reset.toString(),
                },
            }
        );
    }

    return null; // No rate limit error
}