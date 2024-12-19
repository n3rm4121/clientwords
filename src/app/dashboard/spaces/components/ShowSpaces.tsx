'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { ChevronRight, Folder, Loader2, Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { deleteSpace } from '@/app/dashboard/action';
import { toast } from 'react-toastify';
import { AddSpace } from './AddSpace';
import Link from 'next/link';

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
      {isLoading ? (
        // display loading circle
        <div className='flex items-center justify-center h-96'>
          <div className=" mr-4 animate-spin flex size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
          </div>
          <span className=""> Loading spaces</span>
        </div>

      ) : (
        <>
          {spaces.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-16">
              <PlusCircledIcon className="w-24 h-24 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">No spaces yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Create your first space to start collecting testimonials.
              </p>

              <AddSpace addSpace={addSpace} subscriptionTier={subscriptionTier} />

            </div>
          ) : (
            <div className="max-w-4xl mx-auto p-4">
              <h2 className="text-3xl font-bold mb-6 text-center">Your Spaces</h2>
              {spaces.length != 0 && <AddSpace addSpace={addSpace} subscriptionTier={subscriptionTier} />}
              <div className="grid mt-10 grid-cols-1 md:grid-cols-2 gap-4">
                {spaces.map((space) => (
                  <div key={space.id} className="relative rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <Folder className="w-6 h-6 text-blue-500 mr-2" />
                        <h3 className="text-xl font-semibold">{space.name}</h3>
                      </div>
                      <p className="text-gray-600">{space.testimonialsCount} testimonials</p>
                    </div>
                    <Link href={`/dashboard/spaces/${space.name}/${space._id}`} className="px-5 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-all duration-300">
                      <span className="text-sm text-gray-500">View details</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )
      }
    </div >
  );
}





