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
import { Separator } from '@/components/ui/separator';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  const userId = session?.user?.id;
  await dbConnect();
  const userData = await User.findById(userId);
  const accountType = userData.subscriptionTier;
  const firstName = session.user?.name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">Welcome back, {firstName}</p>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatSkeleton />}>
          <TotalTestimonials />
        </Suspense>
        <Suspense fallback={<StatSkeleton />}>
          <AdditionalMetrics />
        </Suspense>
        <Suspense fallback={<StatSkeleton />}>
          <ActiveLoveGallery />
        </Suspense>
        <Suspense fallback={<StatSkeleton />}>
          <AccountType accountType={accountType} />
        </Suspense>
      </div>

      <Separator />

      {/* Spaces */}
      <div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Your Spaces</h2>
          <p className="text-sm text-muted-foreground">
            Each space has its own collection link, form, and gallery.
          </p>
        </div>
        <ShowSpaces subscriptionTier={accountType} />
      </div>
    </div>
  )
}

function StatSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-24" />
      </CardContent>
    </Card>
  )
}
