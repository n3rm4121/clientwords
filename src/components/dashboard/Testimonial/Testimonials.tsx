'use client'

import React, { useEffect, useState, useMemo } from 'react'
import useSWR from 'swr'
import { ITestimonial } from '@/lib/interface'
import { MultipleSkeletonTestimonialCard } from '@/components/ui/skeletons'
import { EmptyState } from './EmptyState'
import TestimonialCard from '@/components/TestimonialCard'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { getUserSubscriptionTier } from '@/app/dashboard/action'
import { useSession } from 'next-auth/react'
import { canCollectTestimonial } from '@/lib/featureAccess'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

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

  const { data: session } = useSession()
  const userId = session?.user?.id

  const { data, error, isLoading, mutate } = useSWR<{ testimonials: ITestimonial[], total: number, page: number, limit: number }>(
    `/api/testimonial?spaceId=${spaceId}&query=${query}&page=${page}&limit=${limit}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const [subTier, setSubTier] = useState<any>(null)
  const [canCollect, setCanCollect] = useState(true)

  // Fetch user subscription tier only when session and userId are available
  useEffect(() => {
    if (session && userId) {
      getUserSubscriptionTier(userId).then((data) => {
        setSubTier(data)
      })
    }
  }, [session, userId])

  // Recalculate testimonial limits based on subscription tier and fetched data
  useEffect(() => {
    if (subTier && data) {
      setCanCollect(canCollectTestimonial(subTier, data.testimonials.length))
    }
  }, [subTier, data])

  // Event source setup
  useEffect(() => {
    if (!spaceId) return

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

  // Memoize total pages to avoid unnecessary recalculations
  const totalPages = useMemo(() => {
    return Math.ceil((data?.total || 0) / limit)
  }, [data?.total, limit])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

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

  if (error) return <div className="text-red-500">Failed to load testimonials. Please try again later.</div>
  if (isLoading) return <MultipleSkeletonTestimonialCard />

  return (
    <div>
      {!canCollect && (
        <Alert className="bg-yellow-50 border-l-4 mb-4 border-yellow-400 text-yellow-700 p-4">
          <Terminal className="h-4 w-4 mr-2" />
          <div>
            <AlertTitle className="font-bold">Heads up!</AlertTitle>
            <AlertDescription>
              You have reached the limit of testimonials for your current subscription tier. Please upgrade your subscription to collect more testimonials.
            </AlertDescription>
          </div>
        </Alert>
      )}
      {data?.testimonials?.length === 0 && <EmptyState uniqueLink={uniqueLink} />}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mx-auto max-w-7xl">
        {data?.testimonials?.map((testimonial) => (
          <div key={testimonial._id} className="break-inside-avoid mb-6">
            <TestimonialCard onDelete={handleDelete} location="testimonials" testimonial={testimonial} onMutate={mutate}/>
          </div>
        ))}
      </div>
      {data?.testimonials?.length !== 0 && (
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
                >
              </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
        </div>
      )}
    </div>
  )
}
