import TotalTestimonials from './components/TotalTestimonials'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { auth } from '@/auth';
import AdditionalMetrics from './components/AdditionalMetrics'
import ActiveLoveGallery from './components/activeLoveGalleries';
import User from '@/models/user.model';
import dbConnect from '@/lib/dbConnect';
import { redirect } from 'next/navigation';
import AccountType from './components/AccountType';
import { ShowSpaces } from './spaces/components/ShowSpaces';


export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  const userId = session?.user?.id;
  await dbConnect();
  const userData = await User.findById(userId);

  const accountType = userData.subscriptionTier;
  return (
    <div className='flex flex-col space-y-8'>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <TotalTestimonials />
        </Suspense>

        <Suspense fallback={<CardSkeleton />}>
          <AdditionalMetrics />
        </Suspense>

        <Suspense fallback={<CardSkeleton />}>
          <ActiveLoveGallery />
        </Suspense>

        <Suspense fallback={<CardSkeleton />}>
          <AccountType accountType={accountType} />
        </Suspense>
      </div>
      <div className='flex-1'>
        <ShowSpaces subscriptionTier={accountType} />
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
        <Skeleton className="h-18 w-full" />
      </CardContent>
    </Card>
  )
}
