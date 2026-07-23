'use client'

import useSWR from 'swr'
import TestimonialCard from './TestimonialCard'
import { MultipleSkeletonTestimonialCard } from '@/components/ui/skeletons'
import { MessageSquare } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function WorkerTestimonials({ workerId, spaceId }: { workerId: string; spaceId: string }) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/testimonial?spaceId=${spaceId}&workerId=${workerId}&limit=50`,
    fetcher,
    { revalidateOnFocus: false }
  )

  if (isLoading) return <MultipleSkeletonTestimonialCard />
  if (error) return <p className="text-red-500 text-sm">Failed to load testimonials.</p>

  if (!data?.testimonials?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <MessageSquare className="w-8 h-8 mb-2 opacity-40" />
        <p className="text-sm">No testimonials yet for this worker.</p>
      </div>
    )
  }

  const handleDelete = (deletedId: string) => {
    mutate(
      (current: any) => ({
        ...current,
        testimonials: current.testimonials.filter((t: any) => t._id !== deletedId),
        total: current.total - 1,
      }),
      false
    )
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-2">
      {data.testimonials.map((t: any) => (
        <div key={t._id} className="break-inside-avoid mb-4">
          <TestimonialCard location="testimonials" testimonial={t} onDelete={handleDelete} onMutate={() => mutate()} />
        </div>
      ))}
    </div>
  )
}
