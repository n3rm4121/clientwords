import TotalTestimonials from './components/TotalTestimonials'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TestimonialsChart } from './components/TestimonialsChart';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Suspense } from 'react';
import LatestTestimonials from './components/LatestTestimonials';
import { auth } from '@/auth';
import AdditionalMetrics from './components/AdditionalMetrics'
import ActiveLoveGallery from './components/activeLoveGalleries';
import User from '@/models/user.model';
import dbConnect from '@/lib/dbConnect';
import { redirect } from 'next/navigation';


export default async function DashboardPage() {
 
  const session = await auth();

  if(!session) return null;
  const userId = session.user?.id;
  await dbConnect();
  const userData = await User.findById(userId);

  if (userData.isNewUser) {
    // If user is new, redirect to welcome page
    return redirect('/dashboard/spaces');
  }
  return (
    <div>
     
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    
         <Suspense fallback={<CardSkeleton />}>
          <TotalTestimonials />
        </Suspense> 
        
        <Suspense fallback={<CardSkeleton />}>
          <AdditionalMetrics />
        </Suspense> 

        <Suspense fallback={<CardSkeleton />}>
          <ActiveLoveGallery />
        </Suspense>
        
      </div>

      <div className='flex flex-col md:flex-row gap-4 md:space-x-4 mt-5'>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials by Space</CardTitle>
            </CardHeader>
            <CardContent>
              <TestimonialsChart />
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Latest Testimonials</CardTitle>
              <CardDescription>
                Top 5 latest testimonials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input type="search" placeholder="Search testimonials..." />
              </div>
              <Suspense fallback={<TestimonialsSkeleton />}>
                <LatestTestimonials userId={userId || ''} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
        
     
      </div>
    </div>

    
  )
}

function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-[250px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-24 w-full" />
      </CardContent>
    </Card>
  )
}

function TestimonialsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}