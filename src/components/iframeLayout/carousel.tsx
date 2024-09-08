'use client';

import React, { useMemo } from 'react';
import { ITestimonial } from '@/lib/interface';
import TestimonialCard from '@/components/TestimonialCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface TestimonialCarouselProps {
  testimonials: ITestimonial[];
  theme: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials, theme }) => {
  const settings = useMemo(() => {
    const slidesToShow = Math.min(testimonials?.length, 3);
    return {
      dots: true,
      infinite: testimonials?.length > 1,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: testimonials?.length > 1,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(testimonials?.length, 3),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: Math.min(testimonials?.length, 2),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }, [testimonials]);

  if (testimonials?.length === 0) {
    return null;
  }

  if (testimonials?.length === 1) {
    return (
      <div className="w-full mx-auto p-2">
        <TestimonialCard
          location="embed"
          testimonial={testimonials[0]}
          theme={theme}
        />
      </div>
    );
  }

  return (
    <div className='slider-container max-w-xs p-4 md:p-8 lg:p-4 md:max-w-full bg-transparent'>
      <Slider {...settings} >
        {testimonials?.map((testimonial) => (
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
  );
};

export default TestimonialCarousel;