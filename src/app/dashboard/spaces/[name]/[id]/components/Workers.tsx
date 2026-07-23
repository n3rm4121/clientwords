'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import { Copy, Check, Link2, UserCircle2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import WorkerTestimonials from './WorkerTestimonials';

interface Worker {
  _id: string;
  name: string;
  role: string;
  uniqueLink: string;
  testimonials: string[];
}

export default function Workers({ spaceId, uniqueLink }: { spaceId: string; uniqueLink: string }) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
    fetchWorkers();
  }, [spaceId]);

  const fetchWorkers = async () => {
    try {
      const res = await fetch(`/api/worker?spaceId=${spaceId}`);
      const data = await res.json();
      if (res.ok) setWorkers(data.workers);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/worker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, spaceId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Worker added successfully');
        setName('');
        setRole('');
        fetchWorkers();
      } else {
        toast.error(data.message || 'Failed to add worker');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async (workerUniqueLink: string, workerId: string) => {
    const url = `${origin}/c/${workerUniqueLink}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(workerId);
    toast.success('Link copied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Add Worker Form */}
      <div className="bg-muted/50 p-4 rounded-md border">
        <h3 className="text-lg font-medium mb-4">Add New Worker</h3>
        <form onSubmit={handleAddWorker} className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="workerName">Name</Label>
            <Input
              id="workerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="workerRole">Role</Label>
            <Input
              id="workerRole"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              placeholder="Barber, Doctor, etc."
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Worker'}
          </Button>
        </form>
      </div>

      {/* Workers List */}
      <div>
        <h3 className="text-lg font-medium mb-4">Team Workers</h3>
        {workers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border rounded-md">
            <UserCircle2 className="w-10 h-10 mb-2 opacity-40" />
            <p className="text-sm">No workers added yet.</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="border rounded-md divide-y">
            {workers.map((w) => (
              <AccordionItem key={w._id} value={w._id} className="border-0">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-4 flex-1 min-w-0 mr-4">
                    <div className="flex flex-col items-start min-w-0">
                      <span className="font-semibold text-base leading-tight">{w.name}</span>
                      <span className="text-sm text-muted-foreground">{w.role}</span>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {w.testimonials?.length ?? 0} testimonial{(w.testimonials?.length ?? 0) !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4">
                  {/* Collection link row */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-md border">
                    <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-blue-600 truncate flex-1 font-mono">
                      {origin}/c/{w.uniqueLink}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-7 w-7"
                      onClick={() => copyLink(w.uniqueLink, w._id)}
                    >
                      {copiedId === w._id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {/* Worker's testimonials */}
                  <WorkerTestimonials workerId={w._id} spaceId={spaceId} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
