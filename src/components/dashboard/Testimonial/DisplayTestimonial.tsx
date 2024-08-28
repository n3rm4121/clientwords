'use client'

import useSWR from 'swr'
import  TestimonialCard  from "@/components/TestimonialCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from 'react';
import { MultipleSkeletonTestimonialCard } from '@/components/ui/skeletons';
import { ITestimonial } from '@/lib/interface';
import { FaComments, FaShareAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// @props location defines the location of testimonail Card
export default function DisplayTestimonials({ location, spaceId }: {location:string, spaceId: string }) {
  const { data, error, isLoading, mutate } = useSWR<{ testimonials: ITestimonial[] }>(
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

  
// TODO: share page link 
  if (data?.testimonials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-lg ">
        <div className=" p-4  mb-6 ">
          <FaComments className="text-5xl text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold mb-3">No testimonials yet</h2>
        <p className="text-center tracking-tight mb-6 text-muted-foreground  max-w-md">
          Your testimonial gallery is waiting to be filled with customer love. Share your public testimonial page and start collecting amazing feedback!
        </p>
        <Button>
          <FaShareAlt className="mr-2" />
          Share Your Page
        </Button>
      </div>
    );
  }
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
