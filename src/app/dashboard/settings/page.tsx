import React from 'react';
import ProfileSettings from './components/ProfileSettings';
import DeleteAccount from './components/DeleteAccount';
import ConnectedAcc from './components/ConnectedAcc';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

const meta: Metadata = {
  title: 'Settings',
};
const SettingsPage = async () => {

  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <MoveLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>
      <ProfileSettings />
      <ConnectedAcc />
      <DeleteAccount />
    </div>
  );
};

export default SettingsPage;
