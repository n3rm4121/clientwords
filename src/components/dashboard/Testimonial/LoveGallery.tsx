'use client'

import React from 'react'
import { TestimonialCard } from "@/components/TestimonialCard";
import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import { ITestimonial } from '@/lib/interface';
import { MultipleSkeletonTestimonialCard } from '@/components/ui/skeletons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaHeart } from 'react-icons/fa';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function LoveGallery() {
  const pathname = usePathname();
  
  const spaceId = pathname.split("/")[4]


  const { data, error, isLoading, mutate } = useSWR<{ testimonials: ITestimonial[] }>(
    `/api/love-gallery?spaceId=${spaceId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  
if (data?.testimonials.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center p-8 ">
      <FaHeart className="text-6xl text-red-600 animate-pulse mb-4" />
      <h2 className="text-2xl font-bold mb-2">Your Love Gallery is Empty</h2>
      <p className="text-center tracking-tight text-muted-foreground mb-4">
        Start adding heartfelt testimonials to fill your gallery with love and appreciation.
      </p>
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
              <TestimonialCard location={'loveGallery'} testimonial={testimonial} />
            </div>
          ))}
      </div>
    </ScrollArea>
  )
}

export default LoveGallery