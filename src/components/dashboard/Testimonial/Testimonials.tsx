'use client'
import React, { useEffect } from 'react'
import useSWR from 'swr';
import { ITestimonial } from '@/lib/interface'
import { MultipleSkeletonTestimonialCard } from '@/components/ui/skeletons';
import { EmptyState } from './EmptyState';
import TestimonialCard from '@/components/TestimonialCard';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Testimonials({
    query,
    currentPage,
    spaceId,
    uniqueLink,
}: {
    query: string;
    currentPage: number;
    spaceId: string;
    uniqueLink: string;
}) {

  const { data, error, isLoading, mutate } = useSWR<{ testimonials: ITestimonial[], total: number }>(
    `/api/testimonial?spaceId=${spaceId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  )
     useEffect(() => {
    const eventSource = new EventSource(`/api/sse?spaceId=${spaceId}`)

    eventSource.onmessage = (event) => {
      const newTestimonial = JSON.parse(event.data)
      mutate((currentData) => {
        if (!currentData) return { testimonials: [newTestimonial], total: 1 }
        return {
          testimonials: [newTestimonial, ...currentData.testimonials],
          total: currentData.total + 1,
        }
      }, false)
    }

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [spaceId, mutate])


  if (error) return <div>Failed to load testimonials</div>
  if (isLoading) return <MultipleSkeletonTestimonialCard />
  if(data?.testimonials.length === 0) return <EmptyState uniqueLink={uniqueLink}/>

    return (
        <div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mx-auto max-w-7xl">
             {data?.testimonials.map((testimonial) => (
               <div key={testimonial._id} className="break-inside-avoid mb-6">
                 <TestimonialCard location={'testimonials'} testimonial={testimonial} />
               </div>
             ))}
           </div>
        </div>
    )
}

