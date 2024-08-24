'use client';

import { TestimonialCard } from "@/components/TestimonialCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from 'react';

interface PageProps {
  spaceId: string;
}

export default function DisplayTestimonials({ spaceId }: PageProps) {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`/api/testimonial?spaceId=${spaceId}`);
        const data = await response.json();
        setTestimonials(data.testimonials);

        // Establish SSE connection
        const eventSource = new EventSource(`/api/sse?spaceId=${spaceId}`);

        eventSource.onmessage = (event) => {
          
          const newTestimonial = JSON.parse(event.data);

          setTestimonials((prevTestimonials) => {
            if (prevTestimonials.some((testimonial) => testimonial._id === newTestimonial._id)) {
              return prevTestimonials;
            } else {
              return [newTestimonial, ...prevTestimonials];
            }
          });

        };

        eventSource.onerror = (error) => {
          console.error('EventSource failed:', error);
          eventSource.close();
        };

        
        return () => {
          eventSource.close();
        };
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []); 

  if (testimonials.length === 0) {
    return null; 
  }

  return (
    <ScrollArea className="h-screen rounded-md border p-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mx-auto max-w-7xl">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="break-inside-avoid mb-6">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

    </ScrollArea>
  );
}
