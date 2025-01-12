'use client'
import React, { useEffect, useState } from 'react';
import { ITestimonial } from '@/lib/interface';
import TestimonialCarousel from '@/components/iframeLayout/carousel';
import { Card } from '@/components/ui/card';
import TestimonialCard from './TestimonialCard';

interface RealTimePreviewProps {
  spaceId: string;
  theme: string;
  layout: string;
}

const RealTimePreview: React.FC<RealTimePreviewProps> = ({ spaceId, theme, layout }) => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialTestimonials = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/love-gallery?spaceId=${spaceId}`);
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTestimonials();
  }, [spaceId]);

  return (
    <Card className="h-full p-4 w-full overflow-hidden">
      <h2 className="text-xl font-semibold mb-3">Preview</h2>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin flex size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"></div>
          <p className="ml-3 text-gray-500">Loading preview</p>
        </div>
      ) : layout === 'carousel' ? (
        <div className="h-full max-w-xs md:max-w-4xl">
          <TestimonialCarousel testimonials={testimonials} theme={theme} />
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mx-auto max-w-7xl">
          {testimonials.map((testimonial, index) => (
            index < 5 &&
            <div key={testimonial._id} className="break-inside-avoid mb-6">
              <TestimonialCard location={'embed'} testimonial={testimonial} theme={theme} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RealTimePreview;
