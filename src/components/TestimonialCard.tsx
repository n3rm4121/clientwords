'use client'
import { FaHeart } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface TestimonialCardProps {
  location: string;
  testimonial: any;
  theme?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ location, testimonial, theme }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const session = useSession();
  const userId = session.data?.user?.id;
  const maxLength = 100; // adjust as needed

const handleToggleExpand = () => {
  setIsExpanded(!isExpanded);
};

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
        userId: userId,
      });
      setIsLoved(res.data.isLoved);
    } catch (error) {
      console.error('Failed to update love gallery', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={` ${location === 'embed' && (theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black')} flex flex-col border  border-blue-600 rounded-md p-6 shadow-lg h-auto max-w-[500]px`}>
      <div className="flex items-center gap-4 mb-4">
    
        <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
          <Image
            src={testimonial?.userAvatar}
            alt={testimonial.userName}
            width={64}
            height={64}
            className="rounded-full w-full h-full"
          />
        </div>
       
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
      <div className=" mt-2">
    {testimonial.message.length > maxLength && !isExpanded
      ? `${testimonial.message.substring(0, maxLength)}... `
      : testimonial.message}
    {testimonial.message.length > maxLength && (
      <span 
        className="text-blue-500 cursor-pointer" 
        onClick={handleToggleExpand}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </span>
    )}
  </div>
    </div>
  );
}

export default TestimonialCard;