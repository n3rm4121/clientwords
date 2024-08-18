'use client'
import React, { useEffect, useState } from 'react'
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

const createSpaceSchema = z.object({
  name: z.string().max(50).min(3),
})

export default function Spaces() {
  const { data: session } = useSession();
  const user = session?.user;

  const [spaces, setSpaces] = useState<any[]>([
    {
      name: 'random',
      owner: '1',
      testimonials: Testimonials,
      spaceId: 12
    }
  ]);

  const router = useRouter();

  const addSpace = (newSpace: any) => {
    setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
  };

  useEffect(() => {
    // fetch spaces
    
    // const fetchSpaces = async () => {
    //   const res = await axios.get('/api/space')
    //   setSpaces(res.data)
    // }

    // fetchSpaces()

  }, [])

  return (
    <div>
      {spaces.length > 0 && spaces.map((space, index) => (
        <div
          onClick={() => router.push(`/dashboard/spaces/${space.spaceId}`)}
          key={index}
          className="cursor-pointer rounded-md w-1/2 h-1/2 bg-red-700"
        >
          <h1>{space.name}</h1>
        </div>
      ))}
  
      <DialogDemo addSpace={addSpace} />
    </div>
  );
}

function DialogDemo({ addSpace }: { addSpace: (newSpace: any) => void }) {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<any>({})

  const handleCreateSpace = async() => {
    try {
      createSpaceSchema.parse({ name })
      setErrors({})

      const res = await axios.post('/api/space', { name })
       console.log(res.data)

    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Space</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Space</DialogTitle>
          <DialogDescription>
            Each Space Represents Your Business or Project
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
          <Button type="submit" onClick={handleCreateSpace}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
