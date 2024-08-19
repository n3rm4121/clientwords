'use client'
import React, { useState, useEffect } from 'react';
import TestimonialCardForm from '@/components/dashboard/testimonialCardForm';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import DisplayTestimonials from '@/components/dashboard/Testimonial/DisplayTestimonial';


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import NotFoundPage from '@/app/not-found';
 
  


function Page() {

    const [testimonails, setTestimonials] = useState([]);
    const [isNewSpace, setIsNewSpace] = useState(false);
    const [error, setError] = useState(false);
    const { id } = useParams();

    useEffect(() => {

        const fetchSpaceData = async () => {
            try {

                const res = await axios.get(`/api/space/${id}`);
                setTestimonials(res.data.space.testimonials);
                setIsNewSpace(res.data.space.isNewSpace);

            } catch (error) {
              console.log(error);
              if (axios.isAxiosError(error) && error.response?.status === 404) {
                  setError(true);
              }
              
            }

        }
        fetchSpaceData();
    }, [id]);

    if (isNewSpace) {
        return (
            <TestimonialCardForm isUpdate={false} spaceId={id.toString()} setIsNewSpace={setIsNewSpace} />
        )
    }

    if(error) {
        return <NotFoundPage />
    }
    return (

        <div>
            
<Tabs defaultValue="Testimonials" className="">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="Testimonials">Testimonials</TabsTrigger>
        <TabsTrigger value="Card">Testimonial Form</TabsTrigger>
        <TabsTrigger value="walloflove">Wall of Love</TabsTrigger>
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
         
            <DisplayTestimonials />
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
            <TestimonialCardForm isUpdate={true} spaceId={id.toString()} setIsNewSpace={setIsNewSpace} />
          </CardContent>      
        </Card>

      </TabsContent>


      <TabsContent value="walloflove">
        <Card>
          <CardHeader>
            <CardTitle>Wall of Love</CardTitle>
            <CardDescription>
             This is your wall of love
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* <TestimonialCardForm isUpdate={true} spaceId={id.toString()} setIsNewSpace={setIsNewSpace} /> */}
          </CardContent>      
        </Card>

      </TabsContent>

    </Tabs>
        
        </div>
    );
}

export default Page;




