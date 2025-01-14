'use client';

import React, { useEffect, useState } from 'react';
import DisplayTestimonials from './components/DisplayTestimonial';
import LoveGallery from './components/LoveGallery';
import TestimonialCardForm from './components/TestimonialCardForm';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [isNewSpace, setIsNewSpace] = useState(false); // Track if the space is new
  const [uniqueLink, setUniqueLink] = useState('');

  useEffect(() => {
    // fetching space data and checking if it's new
    // if its new we will show the TestimonialCardForm first.
    async function fetchSpaceData() {
      try {
        const response = await fetch(`/api/space?id=${id}`);
        const data = await response.json();

        if (response.ok) {
          setIsNewSpace(data.space?.isNewSpace || false);
          setUniqueLink(data.space?.uniqueLink || '');
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching space data:", error);
      }
    }

    fetchSpaceData();
  }, [id]);

  if (isNewSpace) {
    return (
      <TestimonialCardForm
        isUpdate={false}
        spaceId={id}
        setIsNewSpace={setIsNewSpace}
      />
    );
  }

  return (
    <div>
      <Button variant="link" className="text-blue-500">
        <Link href="/dashboard">
          <MoveLeft className="h-6 w-6 inline" /> Dashboard
        </Link>
      </Button>

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
              <DisplayTestimonials uniqueLink={uniqueLink} params={params} />
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
              <TestimonialCardForm isUpdate={true} spaceId={id} uniqueLink={uniqueLink} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loveGallery">
          <Card>
            <CardContent>
              <LoveGallery />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
