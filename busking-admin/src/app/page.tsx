"use client";
import { Button, Input } from '@material-tailwind/react'
import Image from 'next/image'
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, signIn } from './firebase/auth/auth';
import setIsBusking from './firebase/setIsBusking';
import Navbar from './components/Navbar';
import Requests from './components/Requests';

export default function Home() {

  const [user] = useAuthState(auth);

  return user ? (
    <div>
      <Navbar></Navbar>
      <Requests />
    </div>
  ) : (
    <div className="flex container justify-center align-cennter items-center w-full h-screen">
      <Button onClick={async () => {
        await signIn().then(r => {
          if (r) setIsBusking(true);
        });
      }}
      >sign in</Button>
    </div>
  )
}
