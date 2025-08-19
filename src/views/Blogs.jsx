"use client";
import React, { useState } from 'react'
import { Heading, Paragraph } from '@/components/ui/typography'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {WriteBlog,BlogTable, DisplayBlogs} from '@/components/shared';



function Blogs() {
    return (
        <>
            <div>
                {/* Page Header */}
                <div className="mb-6">
                    <Heading level='h1' className="font-extrabold font-roboto text-normal leading-snug sm:leading-snug md:leading-[1.2] lg:leading-[1.25] xl:leading-[1.3] 2xl:leading-[1.35]">Your Blogs</Heading>
                    <Paragraph className="text-light font-[500] leading-relaxed md:leading-[1.6]">
                        Create, manage, and explore your blog posts. Keep your content organized and up-to-date.
                    </Paragraph>
                </div>

                <Tabs defaultValue="blogs">
                    <TabsList>
                        <TabsTrigger value="blogs">All Blogs</TabsTrigger>
                        <TabsTrigger value="writeBlogs">Create Blog</TabsTrigger>
                        <TabsTrigger value="blogTable">Manage Blogs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="writeBlogs">
                        <WriteBlog /> </TabsContent>
                    <TabsContent value="blogs"><DisplayBlogs /></TabsContent>
                    <TabsContent value="blogTable"><BlogTable /></TabsContent>
                </Tabs>
            </div>



        </>
    )
}

export default Blogs
