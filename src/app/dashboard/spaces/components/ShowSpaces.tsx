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
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
              <h2 className="text-3xl font-bold text-center">Your Spaces</h2>
              <p className="text-muted-foreground text-center mb-8">
                Create multiple spaces to collect testimonials for different use cases.
              </p>
              {spaces.length != 0 && <AddSpace addSpace={addSpace} subscriptionTier={subscriptionTier} />}
              <div className="grid mt-10 grid-cols-1 md:grid-cols-2 gap-4">
                {spaces.map((space) => (
                  <Card className="relative">
                    <CardHeader className="pb-2">
                      <div className="absolute right-4 top-4">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash className="h-5 w-5" />
                            </Button>
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
                              <AlertDialogAction
                                disabled={loading}
                                onClick={() => handleSpaceDelete(space._id)}
                                className="bg-destructive text-white hover:bg-destructive/90"
                              >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Folder className="h-6 w-6 text-primary" />
                        <h3 className="text-xl font-semibold">{space.name}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {space.testimonialsCount} testimonials
                      </p>
                    </CardContent>
                    <CardFooter className="p-0">
                      <Link
                        href={`/dashboard/spaces/${space.name}/${space._id}`}
                        className="flex w-full items-center justify-between px-6 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted rounded-md"
                      >
                        View details
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )
          }
        </>
      )
      }
    </div >
  );
}





