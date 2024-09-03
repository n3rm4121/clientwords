
'use client'
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import React, { useState, useEffect } from 'react';
import { FaUser, FaBell, FaToggleOn, FaToggleOff, FaTrash } from 'react-icons/fa';
import { useSession, signOut, getSession } from 'next-auth/react';
import axios from 'axios';

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState(session?.user?.name);
  const [email, setEmail] = useState(session?.user?.email);
  // const [googleConnected, setGoogleConnected] = useState(session?.user?.googleId ? true : false);
  // const [githubConnected, setGithubConnected] = useState(session?.user?.githubId ? true : false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const googleConnected = false;
  const githubConnected = false;
  // useEffect(() => {

  //   if(!session){
  //     return;
  //   }
  //     setUsername(session.user.name);
  //     setEmail(session.user.email);
  //     setGoogleConnected(session.user.googleId ? true : false);
  //     setGithubConnected(session.user.githubId ? true : false);
  // }, [session]);

  // const handleDisconnectGoogle = async () => {
  //   try {
  //     const response = await axios.post('/api/auth/disconnect/google');
  //     if (response.status === 200) {
  //       setGoogleConnected(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleDisconnectGithub = async () => {
  //   try {
  //     const response = await axios.post('/api/auth/disconnect/github');
  //     if (response.status === 200) {
  //       setGithubConnected(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post('/api/auth/delete-account');
      if (response.status === 200) {
        signOut();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MaxWidthWrapper>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Profile Settings Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaUser className="mr-3 text-blue-600" /> Profile Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={'test'}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={"test"}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
        </div>
      </section>

      {/* Notification Preferences Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaBell className="mr-3 text-yellow-600" /> Notification Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Email Notifications</span>
            {emailNotifications ? (
              <FaToggleOn
                className="text-green-500 text-3xl cursor-pointer"
                onClick={() => setEmailNotifications(false)}
              />
            ) : (
              <FaToggleOff
                className="text-gray-400 text-3xl cursor-pointer"
                onClick={() => setEmailNotifications(true)}
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Push Notifications</span>
            {pushNotifications ? (
              <FaToggleOn
                className="text-green-500 text-3xl cursor-pointer"
                onClick={() => setPushNotifications(false)}
              />
            ) : (
              <FaToggleOff
                className="text-gray-400 text-3xl cursor-pointer"
                onClick={() => setPushNotifications(true)}
              />
            )}

</div>
        </div>
      </section>

      {/* Connected Accounts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaUser className="mr-3 text-purple-600" /> Connected Accounts
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Google Account</span>
            {googleConnected ? (
              <button
                className="text-red-500 font-semibold cursor-pointer"
                // onClick={handleDisconnectGoogle}
              >
                Disconnect
              </button>
            ) : (
              <span className="text-gray-400 font-semibold">Not Connected</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">GitHub Account</span>
            {githubConnected ? (
              <button
                className="text-red-500 font-semibold cursor-pointer"
                // onClick={handleDisconnectGithub}
              >
                Disconnect
              </button>
            ) : (
              <span className="text-gray-400 font-semibold">Not Connected</span>
            )}
          </div>
        </div>
      </section>

      {/* Delete Account Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaTrash className="mr-3 text-red-600" /> Delete Account
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            Deleting your account will remove all of your data from our system.
            This action is irreversible.
          </p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default SettingsPage;