'use client'
import React, { useEffect, useState } from 'react';
import { ITestimonial } from '@/lib/interface';
import TestimonialCard from '@/components/TestimonialCard';
import TestimonialCarousel from '@/components/iframeLayout/carousel';
// TODO: css in mobile view while option crousel is selected
interface RealTimePreviewProps {
  spaceId: string;
  theme: string;
  layout: string;
}

const RealTimePreview: React.FC<RealTimePreviewProps> = ({ spaceId, theme, layout }) => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);

  useEffect(() => {
    const fetchInitialTestimonials = async () => {
      const response = await fetch(`/api/love-gallery?spaceId=${spaceId}`);
      const data = await response.json();
      setTestimonials(data.testimonials);
    };

    fetchInitialTestimonials();

    const eventSource = new EventSource(`/api/sse?spaceId=${spaceId}`);

    eventSource.onmessage = (event) => {  
      const newTestimonial = JSON.parse(event.data);
      console.log(newTestimonial);
      setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);
    };

    return () => {
      eventSource.close();
    };
  }, [spaceId]);

  return (
    <div className="h-full p-4 w-full overflow-hidden">
      {layout === 'carousel'? (
        <div className="h-full max-w-xs md:max-w-screen-md">
          <TestimonialCarousel testimonials={testimonials} theme={theme} />
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
  );
};

export default RealTimePreview;
