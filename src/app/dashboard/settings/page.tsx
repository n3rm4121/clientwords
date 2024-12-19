import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import React from 'react';
import ProfileSettings from './components/ProfileSettings';
import DeleteAccount from './components/DeleteAccount';
import ConnectedAcc from './components/ConnectedAcc';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
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
    <MaxWidthWrapper>
      <Button variant='link' className='text-blue-500'>
        <Link href="/dashboard">
          <MoveLeft className="h-6 w-6 inline" /> Dashboard
        </Link>
      </Button>
      <ProfileSettings />
      <ConnectedAcc />
      <DeleteAccount />
    </MaxWidthWrapper>
  );
};

export default SettingsPage;
