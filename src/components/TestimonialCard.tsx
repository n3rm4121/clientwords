'use client'
import { FaHeart } from "react-icons/fa";
export function TestimonialCard({ location, testimonial }: {location:string, testimonial: any }) {

  const handleCreateLoveGallery = () => {
    console.log('Create Love Gallery');
  }
  return (
    <div className="flex flex-col border border-gray-200 rounded-md p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
     
      <div className="flex items-center gap-4 mb-4">
     
        <img
          className="w-12 h-12 rounded-full"
          src={testimonial?.userAvatar}
          alt={testimonial.userName} 
        />
        <div className="flex flex-col">
          <span className="font-medium text-lg">{testimonial.userName}</span>
          <span className="text-sm">{testimonial.userIntro}</span>
          {location === 'testimonials' && (
        <FaHeart onClick={handleCreateLoveGallery} className="  hover:text-red-500 text-2xl mb-4 cursor-pointer" />
      )}
        </div>
      </div>
      <p className=" italic">{testimonial.message}</p>
    </div>
  );
}