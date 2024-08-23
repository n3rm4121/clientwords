'use client'
import { TestimonialCard } from "@/components/TestimonialCard";
import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useEffect, useState } from 'react';
export const testimonials = [
  {
      name: "John Doe",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
      image: '/wall3.jpeg'
  },
  {
      name: "Hero Doe",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
      image: '/dpe.jpg'
  },

  {
      name: "Jane Doe",  
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
      image: '/dpe.jpg'

  },
  {
    name: "Jane Doe",  
    testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
    image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

}
]

// TODO: filters


export default function DisplayTestimonials() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this only runs on the client
  }, []);

  if (!isClient) {
    return null; // Prevent server-side rendering of this component
  }

  return (
    <ScrollArea className="h-screen rounded-md border p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </ScrollArea>
  );
}

