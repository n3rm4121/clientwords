import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import React from 'react';
import ProfileSettings from './components/ProfileSettings';
import DeleteAccount from './components/DeleteAccount';
import ConnectedAcc from './components/ConnectedAcc';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

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
      <ProfileSettings />
      <ConnectedAcc />
      <DeleteAccount />
    </MaxWidthWrapper>
  );
};

export default SettingsPage;
