import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import React from 'react';
import ProfileSettings from './components/ProfileSettings';
import DeleteAccount from './components/DeleteAccount';
import ConnectedAcc from './components/ConnectedAcc';

const SettingsPage = () => {


  return (
    <MaxWidthWrapper>
      {/* <h1 className="text-3xl font-bold mb-8">Settings</h1> */}
  
      <ProfileSettings />
      <ConnectedAcc />
      <DeleteAccount />

    </MaxWidthWrapper>
  );
};

export default SettingsPage;
