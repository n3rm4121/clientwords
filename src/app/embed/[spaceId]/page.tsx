// src/app/embed/[spaceId]/page.tsx
'use client';

import React from 'react';
import { ITestimonial } from '@/lib/interface';
import useSWR from 'swr';
import { MultipleSkeletonTestimonialCard } from '@/components/ui/skeletons';
import TestimonialCard from '@/components/TestimonialCard';

import { useSearchParams } from 'next/navigation';
import TestimonialCarousel from '@/components/iframeLayout/carousel';

interface EmbedPageProps {
  params: {
    spaceId: string;
  };
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const EmbedPage: React.FC<EmbedPageProps> = ({ params }) => {
  const { spaceId } = params;
  const searchParams = useSearchParams();

  const theme = searchParams.get('theme') || 'light';
  const layout = searchParams.get('layout') || 'grid';

  const { data, error, isLoading } = useSWR<{ testimonials: ITestimonial[] }>(
    `/api/embed/testimonials?spaceId=${spaceId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  if (error) return <div>Failed to load testimonials</div>;
  if (isLoading) return <MultipleSkeletonTestimonialCard />;

  const testimonials = data?.testimonials || [];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full  px-4">
        {layout === 'carousel' ? (
          <TestimonialCarousel testimonials={testimonials} theme={theme} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                location="embed"
                testimonial={testimonial}
                theme={theme}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbedPage;
