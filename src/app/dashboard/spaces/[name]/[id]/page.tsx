'use client';

import React, { useEffect, useState } from 'react';
import DisplayTestimonials from './components/DisplayTestimonial';
import LoveGallery from './components/LoveGallery';
import TestimonialCardForm from './components/TestimonialCardForm';
import Workers from './components/Workers';
import { MoveLeft, MessageSquare, Layout, Heart, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Unauthorized from '@/components/Unauthorized';
import { Skeleton } from '@/components/ui/skeleton';

function Page({ params }: { params: { id: string; name: string } }) {
  const { id, name: spaceName } = params;
  const [unauthorized, setUnauthorized] = useState(false);
  const [isNewSpace, setIsNewSpace] = useState(false);
  const [uniqueLink, setUniqueLink] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpaceData() {
      try {
        const response = await fetch(`/api/space?id=${id}`);
        const data = await response.json();
        if (response.ok) {
          setIsNewSpace(data.space?.isNewSpace || false);
          setUniqueLink(data.space?.uniqueLink || '');
          setDisplayName(data.space?.name || decodeURIComponent(spaceName));
        } else {
          setUnauthorized(true);
        }
      } catch {
        setUnauthorized(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSpaceData();
  }, [id, spaceName]);

  if (unauthorized) return <Unauthorized />;

  if (!loading && isNewSpace) {
    return (
      <TestimonialCardForm
        isUpdate={false}
        spaceId={id}
        setIsNewSpace={setIsNewSpace}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb + header */}
      <div>
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/dashboard/spaces" className="hover:text-foreground transition-colors">
            Spaces
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          {loading ? (
            <Skeleton className="h-4 w-24 inline-block" />
          ) : (
            <span className="text-foreground font-medium truncate max-w-[200px]">{displayName}</span>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MoveLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="h-4 w-px bg-border" />
          {loading ? (
            <Skeleton className="h-7 w-40" />
          ) : (
            <h1 className="text-xl font-semibold capitalize">{displayName}</h1>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="testimonials">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-1">
          <TabsTrigger
            value="testimonials"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground transition-colors"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Testimonials
          </TabsTrigger>
          <TabsTrigger
            value="card"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground transition-colors"
          >
            <Layout className="w-4 h-4 mr-2" />
            Form Setup
          </TabsTrigger>
          <TabsTrigger
            value="loveGallery"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground transition-colors"
          >
            <Heart className="w-4 h-4 mr-2" />
            Love Gallery
          </TabsTrigger>
          <TabsTrigger
            value="workers"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground transition-colors"
          >
            <Users className="w-4 h-4 mr-2" />
            Workers
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="testimonials" className="m-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-base">Testimonials</CardTitle>
                <CardDescription>
                  Direct testimonials submitted for this space.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <DisplayTestimonials uniqueLink={uniqueLink} params={params} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="card" className="m-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-base">Form Setup</CardTitle>
                <CardDescription>
                  Customize your public testimonial collection form.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <TestimonialCardForm isUpdate={true} spaceId={id} uniqueLink={uniqueLink} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loveGallery" className="m-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-base">Love Gallery</CardTitle>
                <CardDescription>
                  Embed your favorite testimonials anywhere on your site.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <LoveGallery />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workers" className="m-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-base">Workers</CardTitle>
                <CardDescription>
                  Give each team member their own testimonial collection link.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <Workers spaceId={id} uniqueLink={uniqueLink} />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Page;
