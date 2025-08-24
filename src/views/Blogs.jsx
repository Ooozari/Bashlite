
import React from 'react'
import { Heading, Paragraph } from '@/components/ui/typography'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {WriteBlog,BlogTable, DisplayBlogs} from '@/components/shared';
function Blogs() {
    return (
        <>
            <div className='flex flex-col gap-[40px] sm:gap-[45px] md:gap-[50px] lg:gap-[55px] xl:gap-[60px] 2xl:gap-[64px] pb-3'>
                {/* Page Header */}
                <div className='flex flex-col gap-1'>
                    <Heading level='h1' className="font-extrabold font-roboto text-normal leading-snug sm:leading-snug md:leading-[1.2] lg:leading-[1.25] xl:leading-[1.3] 2xl:leading-[1.35]">Your Blogs</Heading>
                    <Paragraph size='large' className="text-light font-[500]">
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
