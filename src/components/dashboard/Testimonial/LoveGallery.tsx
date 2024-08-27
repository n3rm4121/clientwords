import React from 'react'
import { TestimonialCard } from "@/components/TestimonialCard";

const testimonail = {
  userName: 'nirmal dhakal',
  userIntro: 'this is awesome',
  message: 'this is message'
}
// get all the testimnials in love gallery from db
function LoveGallery() {
  return (
    <div>
      <TestimonialCard location={"loveGallery"} testimonial={testimonail}/>
    </div>
  )
}

export default LoveGallery