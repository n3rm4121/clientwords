'use client'

import useSWR from 'swr'
import { TestimonialCard } from "@/components/TestimonialCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Key, useEffect } from 'react';
import { MultipleSkeletonTestimonialCard } from '@/components/ui/skeletons';

interface Testimonial {
  _id: Key;
  userName: string;
  userIntro: string;
  message: string;
  userAvatar: string;
  spaceId: string;
  spaceName: string;
  // Add other properties of a testimonial here
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// @props location defines the location of testimonail Card
export default function DisplayTestimonials({ location, spaceId }: {location:string, spaceId: string }) {
  const { data, error, isLoading, mutate } = useSWR<{ testimonials: Testimonial[] }>(
    `/api/testimonial?spaceId=${spaceId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  useEffect(() => {
    const eventSource = new EventSource(`/api/sse?spaceId=${spaceId}`);

    eventSource.onmessage = (event) => {
      const newTestimonial = JSON.parse(event.data);
      mutate(
        (currentData) => {
          if (!currentData) return { testimonials: [newTestimonial] };
          return {
            testimonials: [newTestimonial, ...currentData.testimonials]
          };
        },
        false // Set to false to avoid revalidation
      );
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [spaceId, mutate]);

  if (error) return <div>Failed to load testimonials</div>;

  if (isLoading) return <MultipleSkeletonTestimonialCard />;
  return (
    <ScrollArea className="h-screen rounded-md border p-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mx-auto max-w-7xl">
       
          {data?.testimonials.map((testimonial) => (
            <div key={testimonial._id} className="break-inside-avoid mb-6">
              <TestimonialCard location={location} testimonial={testimonial} />
            </div>
          ))}
      </div>
    </ScrollArea>
  );
}
