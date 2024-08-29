// src/app/embed/[spaceId]/page.tsx
'use client'

import React from 'react';
import { ITestimonial } from '@/lib/interface';
import useSWR from 'swr';
import { MultipleSkeletonTestimonialCard } from '@/components/ui/skeletons';
import TestimonialCard from '@/components/TestimonialCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSearchParams } from 'next/navigation';

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

  console.log('theme', theme);
    console.log('layout', layout);

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


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides by default
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false, // Disable center mode to avoid scaling issues
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 slides on medium-large screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show 1 slide on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };
  


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full  px-4">

      {layout === 'carousel' ? (
        <div className='slider-container mx-6'>

        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="px-2">
              <TestimonialCard
                location="embed"
                testimonial={testimonial}
                theme={theme}
              />
            </div>
          ))}
        </Slider>
        </div>
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