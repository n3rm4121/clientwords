'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import Search from '@/components/ui/search'
import Testimonials from '../../../../../../components/dashboard/Testimonial/Testimonials'
import { useCallback, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'

interface Props {
  params: {
    id: string
  }, uniqueLink: string
}

export default function DisplayTestimonials({ params, uniqueLink }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [debouncedQuery] = useDebounce(query, 300)
  const [TotalTestimonials, setTotalTestimonials] = useState(0)
  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('query', debouncedQuery)
    params.set('page', '1') // Reset to first page on new search
    router.push(`?${params.toString()}`, { scroll: false })
  }, [debouncedQuery, router, searchParams])

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4">
        <Search placeholder="Search testimonials by name or message..." onSearch={handleSearch} />
      </div>

      <ScrollArea className="flex-grow rounded-md border p-4">
        <Testimonials
          query={debouncedQuery}
          spaceId={params.id}
          uniqueLink={uniqueLink}
        />
      </ScrollArea>
    </div>
  )
}