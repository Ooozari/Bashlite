"use client";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Heading, Paragraph } from '@/components/ui/typography'
import { BlogCard } from '@/components/shared'
import { useFormik } from 'formik';
import { AddBlogSchema } from '@/validations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorMessage } from '@/components/shared'
import WriteBlog from '@/components/shared/WriteBlog';
import DisplayBlogs from '@/components/shared/DisplayBlogs';



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
                    <TabsTrigger value="blogs">View Blogs</TabsTrigger>
                    <TabsTrigger value="writeBlogs">Write a Blog</TabsTrigger>
                </TabsList>
                <TabsContent value="writeBlogs">
                    <WriteBlog/> </TabsContent>
                <TabsContent value="blogs"><DisplayBlogs /></TabsContent>
            </Tabs>               
            </div>



        </>
    )
}

export default Blogs
