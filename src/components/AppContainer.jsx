// components/AppContainer.js

"use client";


import Navbar from "@/components/Nav";

// src/components/AppContainer.jsx

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from "next/navigation";


const AppContainer = ({ children }) => {
  const supabase = createClient();
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const getUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setToken(localStorage.getItem('token'));
    if (session) {
      setUserData(session);
     
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const signOutHandle = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem('token');
      setUserData(null);
      setToken(null);
      router.push('/');
    } else {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      <Navbar userData={userData} token={token} signOutHandle={signOutHandle} />
      {children}
    </>
  );
};

export default AppContainer;

