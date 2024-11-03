'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import axios from "axios"
import { toast } from "react-toastify"
import { Heart, Loader2, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { deleteTestimonial } from "@/app/dashboard/action"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface TestimonialCardProps {
  location: string
  testimonial: any
  theme?: string
  onDelete?: (deleteId: string) => void
  onMutate?: () => void
}

export default function TestimonialCard({
  location,
  onDelete,
  testimonial,
  theme,
  onMutate,
}: TestimonialCardProps) {
  const [isLoved, setIsLoved] = useState(testimonial.isLoved)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const session = useSession()
  const userId = session.data?.user?.id

  const maxLength = 200

  const handleCreateLoveGallery = async () => {
    setIsLoading(true)
    setIsLoved(!isLoved)

    try {
      const res = await axios.post("/api/love-gallery", {
        testimonialId: testimonial._id,
        spaceId: testimonial.spaceId,
        userId: userId,
      })
      setIsLoved(res.data.isLoved)
      toast.success(
        res.data.isLoved ? "Added to Love Gallery" : "Removed from Love Gallery"
      )
      if (onMutate) {
        onMutate()
      }
    } catch (error) {
      toast.error("Failed to update love gallery")
      console.error("Failed to update love gallery", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await deleteTestimonial(testimonial._id, testimonial.spaceId)
      toast.success("Testimonial deleted successfully")
      if (onDelete) {
        onDelete(testimonial._id)
      }
    } catch (error) {
      toast.error("Failed to delete testimonial")
      console.error("Failed to delete testimonial", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isNew =
    new Date(testimonial.createdAt).getTime() >
    new Date().getTime() - 24 * 60 * 60 * 1000

  return (
    <div
      className={`flex flex-col border rounded-md p-4 shadow-lg w-full max-w-[500px] ${location === "embed" &&
        (theme === "dark" ? "bg-black text-white" : "bg-white text-black")
        }`}
    >
      <div className="flex flex-wrap items-start justify-between mb-4">
        <div className="flex items-center gap-4 mb-2 sm:mb-0">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={testimonial?.userAvatar}
              alt={testimonial.userName}
              width={64}
              height={64}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center flex-wrap">
              <span className="font-medium text-lg truncate mr-2">
                {testimonial.userName}
              </span>
              {location === "testimonials" && isNew && (
                <Badge className="bg-cyan-600 hover:bg-cyan-700">New</Badge>
              )}
            </div>
            <span className="text-sm text-muted-foreground truncate">
              {testimonial.userIntro}
            </span>
          </div>
        </div>
        {location === "testimonials" && (
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCreateLoveGallery}
                  disabled={isLoading}
                >
                  <Heart
                    className={`${isLoved
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                      } hover:text-red-500`}
                  />
                  <span className="sr-only">
                    {isLoved ? "Remove from" : "Add to"} Love Gallery
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isLoved ? "Remove from Love Gallery" : "Add to Love Gallery"}
              </TooltipContent>
            </Tooltip>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2 className="text-red-500 transform hover:scale-105 transition-all duration-300 cursor-pointer" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this testimonial.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isLoading}
                    onClick={handleDelete}
                    className='bg-red-500 hover:bg-red-600'
                  >
                    {isLoading && (
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    )}
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      <div className="mt-2 break-words">
        {testimonial.message.length > maxLength && !isExpanded
          ? `${testimonial.message.substring(0, maxLength)}... `
          : testimonial.message}
        {testimonial.message.length > maxLength && (
          <button
            className="text-blue-500 hover:underline focus:outline-none ml-1"
            onClick={handleToggleExpand}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
      {location === "testimonials" && (
        <p className="text-xs mt-2 text-muted-foreground">
          {new Date(testimonial.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  )
}
