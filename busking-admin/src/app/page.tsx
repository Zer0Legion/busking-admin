"use client";
import { Button, Input } from '@material-tailwind/react'
import Image from 'next/image'
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';


import SignedIn from './components/SignedIn';
import { auth, signIn } from './firebase/auth/auth';
import { signOut } from 'firebase/auth';
import setIsBusking from './firebase/setIsBusking';
import Navbar from './components/Navbar';

export default function Home() {

  const [user] = useAuthState(auth);

  return user && (user.email == "lengkhai@gmail.com" || user.email == "jancycheeqianshi@gmail.com") ? (
    <div>
      <Button onClick={() => {
        signOut(auth);
        setIsBusking(false);
      }}
      >sign out</Button>
      <Navbar></Navbar>
      <SignedIn />
    </div>
  ) : (
    <div className="flex container justify-center align-cennter items-center w-full h-screen">
      <Button onClick={async () => {
        await signIn().then(r => {
          if (r && (r.user.email == "lengkhai@gmail.com" || r.user.email == "jancycheeqianshi@gmail.com")) setIsBusking(true);
        });
      }}
      >sign in</Button>
    </div>
  )
}
