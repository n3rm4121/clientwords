// src/components/TestimonialCarousel.tsx
'use client';

import React from 'react';
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
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides by default
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 slides on medium-large screens
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
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
        breakpoint: 540,
        settings: {
          slidesToShow: 1, // Show 3 slides on medium-large screens
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
    <div className='slider-container p-2'>
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
  );
};

export default TestimonialCarousel;
