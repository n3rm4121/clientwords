'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { ChevronRight, Folder, Loader2, MessageSquare, Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { deleteSpace } from '@/app/dashboard/action';
import { toast } from 'react-toastify';
import { AddSpace } from './AddSpace';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

  if (error) return <div className="text-destructive text-sm">Error loading spaces.</div>;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-1/4 mt-1" />
            </CardContent>
            <CardFooter>
              <div className="h-4 bg-muted rounded w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 border rounded-xl bg-muted/30">
        <PlusCircledIcon className="w-16 h-16 text-muted-foreground/40 mb-4" />
        <h2 className="text-xl font-semibold mb-1">No spaces yet</h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          Create your first space to start collecting and showcasing testimonials.
        </p>
        <AddSpace addSpace={addSpace} subscriptionTier={subscriptionTier} />
      </div>
    );
  }

  function handleSpaceDelete(spaceId: string) {
    try {
      setLoading(true);
      deleteSpace(spaceId);
      setSpaces(spaces.filter(space => space._id !== spaceId));
      toast.success('Space deleted');
    } catch {
      toast.error('Error deleting space');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{spaces.length} space{spaces.length !== 1 ? 's' : ''}</p>
        <AddSpace addSpace={addSpace} subscriptionTier={subscriptionTier} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaces.map((space) => (
          <Card key={space._id} className="group relative flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-md bg-primary/10 shrink-0">
                    <Folder className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold truncate">{space.name}</h3>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete &quot;{space.name}&quot;?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the space and all its testimonials. This cannot be undone.
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
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>

            <CardContent className="pb-3 flex-1">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{space.testimonialsCount ?? 0} testimonial{(space.testimonialsCount ?? 0) !== 1 ? 's' : ''}</span>
              </div>
            </CardContent>

            <CardFooter className="p-0 border-t">
              <Link
                href={`/dashboard/spaces/${space.name}/${space._id}`}
                className="flex w-full items-center justify-between px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-b-lg"
              >
                Open space
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
