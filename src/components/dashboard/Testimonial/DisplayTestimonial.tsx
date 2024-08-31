import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import Search from '@/components/ui/search'
import Testimonials from './Testimonials'
import Space from '@/models/space.model'
import dbConnect from '@/lib/dbConnect'

interface props {
  location?: string,
  searchParams?: {
     query?: string,
      page?: string
  },
  params: {
    id: string
  }
}

export default async function DisplayTestimonials({ searchParams, params }: props) {  

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const id = params.id

  await dbConnect();
  const space = await Space.findById(id)
  const spaceId = space._id
  const uniqueLink = space.uniqueLink
  // const totalPages = Math.ceil((data?.total || 0) / 10) // Assuming 10 items per page

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4">
        <Search placeholder="Search testimonials..."/>
      </div>
      
      <ScrollArea className="flex-grow rounded-md border p-4">
          <Testimonials query={query} currentPage={currentPage} uniqueLink={uniqueLink} spaceId={spaceId.toString()} />
      </ScrollArea>
      
      {/* <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  )
}



function Pagination({ page, totalPages, onPageChange }: { page: number, totalPages: number, onPageChange: (newPage: number) => void }) {
  return (
    <div className="flex justify-center items-center p-4">
      <Button 
        onClick={() => onPageChange(page - 1)} 
        disabled={page === 1}
        className="mr-2"
      >
        Previous
      </Button>
      <span>{page} of {totalPages}</span>
      <Button 
        onClick={() => onPageChange(page + 1)} 
        disabled={page === totalPages}
        className="ml-2"
      >
        Next
      </Button>
    </div>
  )
}
