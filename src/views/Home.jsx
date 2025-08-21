"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Heading, Paragraph } from '@/components/ui/typography';
import Image from 'next/image';
import { User } from 'lucide-react';
import {Dashboard,Dashboard2,Dashboard3} from '@/svg/Icon'

function Home() {
  const userPreferences = useSelector((state) => state.userPreferences);
  const blogs = useSelector((state) => state.userBlogs.blogs);
  const products = useSelector((state) => state.userProducts.products);

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        {/* Avatar */}
        <div className='w-[50px] h-[50px] relative rounded-[4px] overflow-hidden'>
          {userPreferences.avatar ? (
            <Image
              src={userPreferences.avatar}
              alt="user avatar"
              fill
              className="object-cover w-full h-full"
              onError={(e) => { e.currentTarget.src = ""; }}
            />
          ) : (
            <div className='w-full h-full bg-foreground/50 flex justify-center items-center'>
              <User className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        {/* Username */}
        <Heading level="medium" className="font-[700] text-dark">
          {userPreferences.username || "User"}
        </Heading>
      </div>

      {/* Dashboard Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-2">
         <Dashboard className="w-15 h-15 text-primary"/>
         <Dashboard2 className="w-15 h-15 text-primary"/>
         <Dashboard3 className="w-15 h-15 text-primary"/>
          Dashlite Overview
        </h1>
        <Paragraph size="medium" className="text-[var(--color-text)]">
          Welcome back! Here’s an overview of your CMS content.
        </Paragraph>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-lg shadow bg-[var(--color-primary)] text-white flex flex-col items-center">
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-xl font-bold">{products?.length || 0}</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-[var(--color-primary)] text-white flex flex-col items-center">
          <h2 className="text-lg font-semibold">Blogs</h2>
          <p className="text-xl font-bold">{blogs?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
