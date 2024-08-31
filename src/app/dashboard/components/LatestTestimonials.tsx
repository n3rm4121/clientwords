import dbConnect from '@/lib/dbConnect'
import Testimonial from '@/models/testimonials.model'
import Image from 'next/image'
import { badgeVariants } from "@/components/ui/badge"
import Link from 'next/link'

export default async function LatestTestimonials({ userId }: { userId: string }) {
  await dbConnect()
  const latestTestimonials = await Testimonial.find({ owner: userId }).sort({ createdAt: -1 }).limit(5)


  return (
    <>
    {latestTestimonials.length === 0 ? (
            <div className="text-muted-foreground text-center">No testimonials yet</div>
        ):(
            <div className="space-y-6"> {/* Increased space between testimonial cards */}
            {latestTestimonials.map((testimonial) => (
              <div key={testimonial._id} className="flex items-start space-x-4 p-4 border rounded-lg shadow-sm ">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <Image
                    src={testimonial.userAvatar}
                    alt={testimonial.userName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
      
                {/* Testimonial Content */}
                <div className="flex-1">
                  <div className="mb-2">
                    <p className="font-semibold ">{testimonial.userName}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.userIntro}</p>
                  </div>
      
                  <p className="text-sm mb-2">{testimonial.message.substring(0, 100)}...</p>
                  <p className="text-xs text-muted-foreground">{new Date(testimonial.createdAt).toLocaleDateString()}</p>
                </div>
      
                {/* Space Name Badge */}
                <div className="flex-shrink-0">
                  <Link href={`/dashboard/spaces/${testimonial.spaceName}/${testimonial.spaceId}`} className={badgeVariants({ variant: "outline" })}>
                    {testimonial.spaceName}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
    }
   
    </>
  )
}
