'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { ITestimonial } from '@/lib/interface'
import { MultipleSkeletonTestimonialCard } from '@/components/ui/skeletons';
import { EmptyState } from './EmptyState';
import TestimonialCard from '@/components/TestimonialCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { toast, ToastContainer } from 'react-toastify';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Testimonials({
  query,
  spaceId,
  uniqueLink,
}: {
  query: string
  spaceId: string
  uniqueLink: string
}) {
  const [page, setPage] = useState(1)
  const limit = 9

  const { data, error, isLoading, mutate } = useSWR<{ testimonials: ITestimonial[], total: number, page: number, limit: number }>(
    `/api/testimonial?spaceId=${spaceId}&query=${query}&page=${page}&limit=${limit}`,
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
        if (!currentData) return { testimonials: [newTestimonial], total: 1, page: 1, limit }
        return {
          testimonials: [newTestimonial, ...currentData.testimonials],
          total: currentData.total + 1,
          page: currentData.page,
          limit: currentData.limit,
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
  
  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = (deletedId: string) => {
    mutate((currentData) => {
      if (!currentData) return currentData
      const updatedTestimonials = currentData.testimonials.filter(
        (testimonial) => testimonial._id !== deletedId
      )
      return {
        ...currentData,
        testimonials: updatedTestimonials,
        total: currentData.total - 1,
      }

    }, false)
  }

  return (
    <div>
      {data?.testimonials?.length === 0 && <EmptyState uniqueLink={uniqueLink} />}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mx-auto max-w-7xl">
        {data?.testimonials?.map((testimonial) => (
          <div key={testimonial._id} className="break-inside-avoid mb-6">
            <TestimonialCard onDelete={handleDelete} location={'testimonials'} testimonial={testimonial} />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => handlePageChange(i + 1)}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}