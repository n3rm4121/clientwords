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
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Testimonials</CardTitle>
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
          <MessageSquareHeart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{totalTestimonials}</div>
        <p className="text-xs text-muted-foreground mt-1">across all spaces</p>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
    </Card>
  )
}
