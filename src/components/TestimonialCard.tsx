'use client'
import { FaHeart } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import axios from "axios";
import { useEffect, useState } from "react";

export function TestimonialCard({ location, testimonial }: {location:string, testimonial: any }) {
  const [isLoved, setIsLoved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location === 'testimonials') {
      const fetchLoveGallery = async () => {
        try {
          const res = await axios.get(`/api/love-gallery?spaceId=${testimonial.spaceId}`);

          setIsLoved(res.data.lovedIds?.includes(testimonial._id) || false);
        } catch (error) {
          console.error('Failed to fetch love gallery', error);
        }
      };
      fetchLoveGallery();
    } else {
      setIsLoved(testimonial.isLoved || false);
    }
  }, [testimonial._id, testimonial.spaceId, location]);

  const handleCreateLoveGallery = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/love-gallery', {
        testimonialId: testimonial._id,
        spaceId: testimonial.spaceId,
      });
      setIsLoved(res.data.isLoved);
    } catch (error) {
      console.error('Failed to update love gallery', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded-md p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img
          className="w-12 h-12 rounded-full"
          src={testimonial?.userAvatar}
          alt={testimonial.userName} 
        />
        <div className="flex flex-1 flex-col">
          <span className="font-medium text-lg">{testimonial.userName}</span>
          <span className="text-sm">{testimonial.userIntro}</span>
        </div>
        {location === 'testimonials' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <FaHeart 
                  onClick={handleCreateLoveGallery}
                  className={`${isLoved ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 text-2xl mb-4 cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {isLoved ? 'Remove from Love Gallery' : 'Add to Love Gallery'}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <p className="italic">{testimonial.message}</p>
    </div>
  );
}