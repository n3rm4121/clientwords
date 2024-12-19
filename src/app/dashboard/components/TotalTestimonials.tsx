import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dbConnect from "@/lib/dbConnect"
import Testimonial from "@/models/testimonials.model"
import { auth } from "@/auth"
import { MessageSquareHeart } from "lucide-react"
export default async function TotalTestimonials() {
  await dbConnect()
  const session = await auth()
  if (!session) return null
  const userId = session?.user?.id

  const totalTestimonials = await Testimonial.find({ owner: userId }).countDocuments()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between  space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Testimonials Received</CardTitle>
        <MessageSquareHeart className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {totalTestimonials}
        </div>

      </CardContent>

    </Card>
  )
}