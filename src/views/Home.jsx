"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Heading, Paragraph } from '@/components/ui/typography';
import Image from 'next/image';
import { User } from 'lucide-react';


function Home() {
  const userPreferences = useSelector((state) => state.userPreferences);
  const blogs = useSelector((state) => state.userBlogs.blogs);
  const products = useSelector((state) => state.userProducts.products);

  return (
    <div className="flex flex-col w-full">
      {/* User Info */}
      <div className="flex items-center gap-2 mb-6 justify-end">
        {/* Username */}
        <div>
          <Heading level="normal" className="font-[800] text-dark">
            {userPreferences.username}
          </Heading>
          <Heading level="normal" className="text-light">
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
      <div className="mb-[40px] sm:mb-[45px] md:mb-[50px] lg:mb-[55px] xl:mb-[60px] 2xl:mb-[64px]">
        <Heading level="h1" className="font-bold text-dark mb-2">
          Dashlite Overview
        </Heading>
        <Paragraph size="large" className="text-normal">
          Welcome back! Here’s an overview of your CMS content.
        </Paragraph>
      </div>


      {/* Stats Cards */}
      <div className="flex gap-3 md:gap-5">
        <div className="aspect-square w-[250px] rounded-[8px] shadow bg-[var(--chart-3)] text-white flex flex-col items-center justify-center">
          <Heading level="cardh1" className="font-[900] font-roboto">{products?.length || 0}</Heading>
          <Paragraph size="xxl" className="font-bold">Products</Paragraph>
        </div>
        <div className="aspect-square w-[250px] rounded-[8px] shadow bg-[var(--chart-2)] text-white flex flex-col items-center justify-center">
           <Heading level="cardh1" className="font-[900] font-roboto">{blogs?.length || 0}</Heading>
          <Paragraph size="xxl" className="font-bold">Blogs</Paragraph>
        </div>
      </div>
    </div>
  );
}

export default Home;
