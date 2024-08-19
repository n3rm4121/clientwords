'use client'
import React, { useEffect, useState, useCallback} from 'react'
import { useRouter } from 'next/navigation'
import Testimonials from "../testimonial/page"
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from 'zod'
import axios from 'axios';

import { generateUniqueLink } from '@/utils/generateUniqueLink';

const createSpaceSchema = z.object({
  name: z.string().max(50, 'Name must be less than 50 characters').min(3, 'Name must be at least 3 characters'),
})



export default function Spaces() {

  const [spaces, setSpaces] = useState<any[]>([]);

  const router = useRouter();

  const addSpace = (newSpace: any) => {
    
    setSpaces((prevSpaces) => [...(prevSpaces || []), newSpace]);
  };

  useEffect(() => {
    // fetch spaces
    
    const fetchSpaces = async () => {
      const res = await axios.get('/api/space')
      setSpaces(res.data.spaces)
    }

    fetchSpaces()

  }, [])

  return (
    <div className="p-6">

  <DialogDemo addSpace={addSpace} />
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {spaces?.length > 0 && spaces.map((space, index) => (
      <div
        onClick={() => router.push(`/dashboard/spaces/${space.name}/${space._id}`)}
        key={index}
        className="cursor-pointer bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 overflow-hidden">{space.name}</h2>
        </div>
      </div>
    ))}
  </div>

</div>

  );
}

function DialogDemo({ addSpace }: { addSpace: (newSpace: any) => void }) {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<any>({})
  const router = useRouter();

  const handleCreateSpace = useCallback(async (name: string) => {
    try {
      createSpaceSchema.parse({ name });
      
      const res = await axios.post('/api/space', { name });
  
      addSpace(res.data.space);

      setErrors({});

        console.log(res.data.space.name);
     router.push(`/dashboard/spaces/${res.data.space.name}/${res.data.space._id}`);
    } catch (error) {
  
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();

        setErrors(formattedErrors);

      } else if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data || error.message);
      }
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Space</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Space</DialogTitle>
          <DialogDescription>
           <p> Each Space Represents Your Business or Project. </p>
          
             <p className='text-blue-500'>{generateUniqueLink(name, 'Space_Id')}</p>
            
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            placeholder="eg. My Business"
            className="col-span-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors?.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name._errors[0]}</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => handleCreateSpace(name)}>Create Space</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
  )
}