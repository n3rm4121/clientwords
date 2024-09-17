import React from 'react';
import { ITestimonial } from '@/lib/interface';
import TestimonialCard from '@/components/TestimonialCard';
import TestimonialCarousel from '@/components/iframeLayout/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { getUserSubscriptionTier } from '@/app/dashboard/action';
import Space from '@/models/space.model';
interface EmbedPageProps {
  params: {
    spaceId: string;
  },
  searchParams?: {
    [key: string]: string | undefined
  }
}

const EmbedPage: React.FC<EmbedPageProps> = async ({ params, searchParams }) => {
  const { spaceId } = params;
  const theme = searchParams?.theme || 'light';
  const layout = searchParams?.layout || 'grid';
  const spaceOwner = await Space.findById(spaceId).select('owner').exec();
  const HOST = process.env.NEXT_PUBLIC_APP_URL;
  const apiURL = `${HOST}/api/embed/testimonials?spaceId=${spaceId}`;
  const subscriptionTier = await getUserSubscriptionTier(spaceOwner.owner as string)
  try {
    const response = await fetch(apiURL, {
      headers: {
        // Optional: You can add headers if needed, such as authorization
      },
      cache: 'no-store', // Ensures the latest data is fetched
    });

    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }

    const data = await response.json();

    const testimonials: ITestimonial[] = data.testimonials;  // Ensure the correct key is accessed
    return (
     
        <div className="w-full  min-h-screen bg-white  px-8">
          
          {layout === 'carousel' ? (
            <div className="w-full">
              <TestimonialCarousel testimonials={testimonials} theme={theme} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  location="embed"
                  testimonial={testimonial}
                  theme={theme}
                />
              ))}
            </div>
          )}
          {subscriptionTier === 'Free' && (
             <div className="w-full gap-4 text-black font-bold text-2xl flex justify-center py-4">
             <Link href='https://clientwords.com' target='_blank' rel='noopener noreferrer'>
            <Image src='/brand.png' width={200} height={200} alt='ClientWords' />
            </Link>
         </div>
          )
            }
          
        </div>
   
    );
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return <div className="w-full h-full flex items-center justify-center bg-transparent text-center p-4">Failed to load testimonials</div>;
  }
};

export default EmbedPage;