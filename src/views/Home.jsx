"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Heading, Paragraph } from '@/components/ui/typography';
import Image from 'next/image';
import { User } from 'lucide-react';
import { Dashboard, Dashboard2, Dashboard3 } from '@/svg/Icon'

function Home() {
  const userPreferences = useSelector((state) => state.userPreferences);
  const blogs = useSelector((state) => state.userBlogs.blogs);
  const products = useSelector((state) => state.userProducts.products);

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-6 justify-end">
        {/* Username */}
        <div>
          <Heading level="medium" className="font-[500] text-dark">
            {userPreferences.username}
          </Heading>
          <Heading level="medium" className="text-extraLight">
            {userPreferences.email}
          </Heading>
        </div>

        {/* Avatar */}
        <div className='w-[40px] h-[40px] sm:w-[42px] sm:h-[42px] md:w-[44px] md:h-[44px] lg:w-[46px] lg:h-[46px] xl:w-[48px] xl:h-[48px] 2xl:w-[50px] 2xl:h-[50px] relative  '>
          {userPreferences.avatar ? (
            <Image
              src={userPreferences.avatar}
              alt="user avatar"
              fill
              className="object-cover w-full h-full rounded-[4px]"
              onError={(e) => { e.currentTarget.src = ""; }}
            />
          ) : (
            <div className='w-full h-full bg-foreground/50 flex justify-center items-center'>
              <User className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-2">
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
