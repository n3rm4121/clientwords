'use client'
import { generateUniqueLink } from '@/utils/generateUniqueLink';
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
import { FaBuilding } from 'react-icons/fa';
import { z } from 'zod'

import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useSWR from 'swr';
import { MultipleSkeletonSpaceCard } from '../ui/skeletons';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Gem, Loader2, Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { deleteSpace, getUserSpaceCount } from '@/app/dashboard/action';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { canCreateSpace } from '@/lib/featureAccess';
const fetcher = (url: string | URL | Request) => fetch(url).then(r => r.json())

export const ShowSpaces = ({ subscriptionTier }: { subscriptionTier: any }) => {
  const [spaces, setSpaces] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addSpace = (newSpace: any) => {
    setSpaces((prevSpaces) => [...(prevSpaces || []), newSpace]);
  };

  const { data, isLoading, error } = useSWR('/api/space', fetcher);
  useEffect(() => {
    if (data && data.spaces) {
      setSpaces(data.spaces);
    }
  }, [data]);

  if (error) return <div>Error loading spaces{error}</div>;

  function handleSpaceDelete(spaceId: string) {

    try {
      setLoading(true);
      deleteSpace(spaceId);

      setSpaces(spaces.filter(space => space._id !== spaceId));
      toast.success('Space deleted successfully');

      setLoading(false);
    } catch (error) {
      toast.error('Error deleting space');
      setLoading(false);
      console.error('Error deleting space:', error);

    }
  }

  return (
    <div>
      {/* Dialog for adding a new space */}
      {spaces.length != 0 && <DialogDemo addSpace={addSpace} subscriptionTier={subscriptionTier} />}

      {isLoading ? (
        <MultipleSkeletonSpaceCard />
      ) : (
        <>
          {spaces.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-16">
              <PlusCircledIcon className="w-24 h-24 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">No spaces yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Create your first space to start collecting testimonials.
              </p>

              <DialogDemo addSpace={addSpace} subscriptionTier={subscriptionTier} />

            </div>
          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {spaces.map((space) => (
                <div
                  key={space._id}
                  className="bg-blue-400 backdrop-blur-sm bg-opacity-10 border border-blue-500 rounded-lg shadow-lg hover:shadow-xl"
                >
                  <div className="px-2 py-4 max-w-sm">

                    {/* Icon for Deleting Space */}
                    <div className='absolute top-2 right-2'>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>

                          <Trash className='text-red-500 hover:fill-red-500 transform hover:scale-105 transition-all duration-300 cursor-pointer' />

                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              space and remove all data related to this space.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={loading} onClick={() => handleSpaceDelete(space._id)} className='bg-red-500 hover:bg-red-600'>{loading && <Loader2 className='animate-spin w-4 h-4 mr-2' />} Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>


                    </div>
                    {/* Icon for space representation */}
                    <div className="flex justify-center mb-4">
                      <FaBuilding className="text-3xl" />
                    </div>

                    {/* Space name */}
                    <h2 className="text-xl font-bold overflow-hidden text-center mb-2">
                      {space.name}
                    </h2>

                    {/* Testimonials count */}
                    <p className="text-center">
                      Total Testimonials Received: <span className="font-semibold">{space.testimonialsCount | 0}</span>
                    </p>

                    {/* Optional Call to Action */}
                    <div className="mt-4 flex justify-center">
                      <Button onClick={() => router.push(`/dashboard/spaces/${space.name}/${space._id}`)} variant='outline'>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}



const createSpaceSchema = z.object({
  name: z.string().max(50, 'Name must be less than 50 characters').min(3, 'Name must be at least 3 characters'),
})


export function DialogDemo({ addSpace, subscriptionTier }: { subscriptionTier: any, addSpace: (newSpace: any) => void }) {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [spaceCount, setSpaceCount] = useState(0);  // Track space count
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  const can = canCreateSpace(subscriptionTier, spaceCount);

  // Fetch user space count
  useEffect(() => {
    const fetchSpaceCount = async () => {
      try {
        if (user?.id) {
          const count = await getUserSpaceCount(user.id);  // Assuming this returns a number
          setSpaceCount(count);
        }
      } catch (error) {
        toast.error('Error fetching space count');
        console.error(error);
      }
    };

    fetchSpaceCount();
  }, [user]);

  const handleCreateSpace = useCallback(async (name: string) => {
    try {
      setLoading(true);
      createSpaceSchema.parse({ name });

      const res = await axios.post('/api/space', { name });

      addSpace(res.data.space);
      setLoading(false);
      setErrors({});

      router.push(`/dashboard/spaces/${name}/${res.data.space._id}`);
    } catch (error) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      } else if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>


          <Button disabled={!can}>
            Create New Space
            {(!user?.isProUser || spaceCount >= 1) && <Gem className="ml-2 h-4 w-4" />}
          </Button>

        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-w-xs">
          <DialogHeader>
            <DialogTitle>Create Space</DialogTitle>
            <DialogDescription>
              <span className="text-blue-500">
                {generateUniqueLink(name, 'Space_Id')}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div>
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
              <span className="text-red-500 text-sm mt-1">{errors.name._errors[0]}</span>
            )}
          </div>
          <DialogFooter>
            <Button
              loading={loading}
              onClick={() => handleCreateSpace(name.replace(/\s+/g, ''))}
              disabled={!can}  // Disable button if user already has a space
            >
              Create New Space
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
