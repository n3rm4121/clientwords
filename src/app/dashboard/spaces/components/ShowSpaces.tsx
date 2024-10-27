'use client'

import { FaBuilding } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { MultipleSkeletonSpaceCard } from '../../../../components/ui/skeletons';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Loader2, Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../../../components/ui/alert-dialog';
import { deleteSpace } from '@/app/dashboard/action';
import { toast } from 'react-toastify';
import { AddSpace } from './AddSpace';

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
      {spaces.length != 0 && <AddSpace addSpace={addSpace} subscriptionTier={subscriptionTier} />}

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

              <AddSpace addSpace={addSpace} subscriptionTier={subscriptionTier} />

            </div>
          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {spaces.map((space) => (
                <div
                  key={space._id}
                  className="bg-blue-400 backdrop-blur-sm bg-opacity-10 border border-blue-500 rounded-lg shadow-lg hover:shadow-xl"
                >
                  <div className="px-2 py-4 max-w-sm">


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

                    <h2 className="text-xl font-bold overflow-hidden text-center mb-2">
                      {space.name}
                    </h2>

                    <p className="text-center">
                      Total Testimonials Received: <span className="font-semibold">{space.testimonialsCount | 0}</span>
                    </p>

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





