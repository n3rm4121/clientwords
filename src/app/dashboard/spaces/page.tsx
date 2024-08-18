'use client'
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
// get session user
import { useSession } from "next-auth/react"


interface Space {
  id: number;
  name: string;
  testimonialCount: number;
}
  
interface User {
  name: string;
  email: string;
  isPro: boolean;
  spaces: Space[];
}

const SpacesPage: NextPage = () => {
  const session = useSession() as unknown as {
    loading: any; user?: User 
};
const loading = session?.loading;
if(loading) return <div>Loading...</div>
   console.log(session);
  const currentUser = session?.user;
  // const [user, setUser] = useState<User>({
  //   isPro: false,
  //   spaces: []
  // });
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(true);

  // useEffect(() => {
  //   // Fetch user data from your API
  //   const fetchUserData = async () => {
  //     // Replace this with your actual API call
  //     const response = await fetch('/api/user');
  //     const userData = await response.json();
  //     setUser(userData);
  //   };

  //   fetchUserData();
  // }, []);

  // const addNewSpace = async () => {
  //   if (!user.isPro && user.spaces.length >= 1) {
  //     setShowUpgradePrompt(true);
  //   } else {
  //     // Logic to add a new space
  //     try {
  //       const response = await fetch('/api/spaces', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ name: 'New Space' })
  //       });
  //       if (response.ok) {
  //         const newSpace = await response.json();
  //         setUser(prevUser => ({
  //           ...prevUser,
  //           spaces: [...prevUser.spaces, newSpace]
  //         }));
  //       }
  //     } catch (error) {
  //       console.error('Failed to add new space:', error);
  //     }
  //   }
  // };

  const editSpace = async (id: number) => {
    // Logic to edit a space
    console.log("Editing space", id);
    // Implement the edit functionality
  };

  // const deleteSpace = async (id: number) => {
  //   try {
  //     const response = await fetch(`/api/spaces/${id}`, { method: 'DELETE' });
  //     if (response.ok) {
  //       setUser(prevUser => ({
  //         ...prevUser,
  //         spaces: prevUser.spaces.filter(space => space.id !== id)
  //       }));
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete space:', error);
  //   }
  // };

  return (
    <div>
      <Head>
        <title>TestiBoost - Spaces</title>
        <meta name="description" content="Manage your TestiBoost spaces" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1 >Your Spaces</h1>

        {/* <div >
          {user.spaces.map(space => (
            <div key={space.id} >
              <h3>{space.name}</h3>
              <p>Testimonials: {space.testimonialCount}/10</p>
              <button onClick={() => editSpace(space.id)}>Edit</button>
              <button onClick={() => deleteSpace(space.id)}>Delete</button>
            </div>
          ))}
        </div> */}

        {/* <button onClick={addNewSpace}>
          Add New Space
        </button> */}

        {showUpgradePrompt && (
          <div >
            <p>You've reached the limit for free users. Upgrade to Pro for unlimited spaces and testimonials!</p>
            <button onClick={() => {/* Implement upgrade logic */}}>
              Upgrade to Pro
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SpacesPage;