import TestimonialCardForm from '@/components/dashboard/testimonialCardForm';
import DisplayTestimonials from '@/components/dashboard/Testimonial/DisplayTestimonial';
import LoveGallery from '@/components/dashboard/Testimonial/LoveGallery';
import dynamic from 'next/dynamic';
import Space from '@/models/space.model';
import { Suspense } from 'react';
// Dynamically import the client components
const Card = dynamic(() => import('@/components/ui/card').then(mod => mod.Card), { ssr: false });
const CardContent = dynamic(() => import('@/components/ui/card').then(mod => mod.CardContent), { ssr: false });
const CardDescription = dynamic(() => import('@/components/ui/card').then(mod => mod.CardDescription), { ssr: false });
const CardHeader = dynamic(() => import('@/components/ui/card').then(mod => mod.CardHeader), { ssr: false });
const CardTitle = dynamic(() => import('@/components/ui/card').then(mod => mod.CardTitle), { ssr: false });

const Tabs = dynamic(() => import('@/components/ui/tabs').then(mod => mod.Tabs), { ssr: false });
const TabsContent = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsContent), { ssr: false });
const TabsList = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsList), { ssr: false });
const TabsTrigger = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsTrigger), { ssr: false });
const DynamicSpaceWrapper = dynamic(() => import('../../components/DynamicSpaceWrapper'), { ssr: false});


async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch space data server-side
  const space = await Space.findById(id).exec();
  const isInitiallyNewSpace = space.isNewSpace;

  // Render content based on whether it's a new space or not
  const content = 
    <Tabs defaultValue="Testimonials" className="">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="Testimonials">Testimonials</TabsTrigger>
        <TabsTrigger value="Card">Testimonial Form</TabsTrigger>
        <TabsTrigger value="loveGallery">Love Gallery</TabsTrigger>
      </TabsList>

      <TabsContent value="Testimonials">
        <Card>
          <CardHeader>
            <CardTitle>Testimonials Received</CardTitle>
            <CardDescription>
              These are the testimonials received for this space.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Suspense fallback={<div>Loading testimonials...</div>}>
              <DisplayTestimonials params={params} />
            </Suspense>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="Card">
        <Card>
          <CardHeader>
            <CardTitle>Testimonial Form</CardTitle>
            <CardDescription>
              This is your testimonial form Card for this space. Update the form as needed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <TestimonialCardForm isUpdate={true} spaceId={id} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="loveGallery">
        <Card>
          <CardContent>
            <Suspense fallback={<div>Loading love gallery...</div>}>
              <LoveGallery />
            </Suspense>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

  // Wrap the content in a dynamic client-side component
  return <DynamicSpaceWrapper spaceId={id} initialIsNewSpace={isInitiallyNewSpace}>{content}</DynamicSpaceWrapper>;
}

export default Page;


