'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';

export default function Workers({ spaceId, uniqueLink }: { spaceId: string, uniqueLink: string }) {
  const [workers, setWorkers] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
    fetchWorkers();
  }, [spaceId]);

  const fetchWorkers = async () => {
    try {
      const res = await fetch(`/api/worker?spaceId=${spaceId}`);
      const data = await res.json();
      if (res.ok) {
        setWorkers(data.workers);
      }
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
        body: JSON.stringify({ name, role, spaceId })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Worker added successfully");
        setName('');
        setRole('');
        fetchWorkers();
      } else {
        toast.error(data.message || "Failed to add worker");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-md border">
        <h3 className="text-lg font-medium mb-4">Add New Worker</h3>
        <form onSubmit={handleAddWorker} className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="workerName">Name</Label>
            <Input id="workerName" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="workerRole">Role</Label>
            <Input id="workerRole" value={role} onChange={(e) => setRole(e.target.value)} required placeholder="Barber, Doctor, etc." />
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Worker'}</Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Current Workers</h3>
        {workers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No workers added yet.</p>
        ) : (
          <div className="grid gap-4">
            {workers.map((w: any) => (
              <div key={w._id} className="border p-4 rounded-md flex justify-between items-center bg-card">
                <div>
                  <p className="font-semibold text-lg">{w.name}</p>
                  <p className="text-sm text-muted-foreground">{w.role}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-xs text-muted-foreground mb-1">Collection Link:</p>
                  <a href={`/c/${w.uniqueLink}`} target="_blank" className="text-sm text-blue-500 hover:underline bg-blue-50 px-2 py-1 rounded">
                    {origin}/c/{w.uniqueLink}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
