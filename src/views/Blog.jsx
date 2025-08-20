"use client";
import React from 'react'
import { Heading, Paragraph } from '@/components/ui/typography'
import { useSelector } from 'react-redux';
function Blog({ blogId }) {
    console.log("This is blogId", blogId);
    const blog = useSelector(state =>
        state.userBlogs.blogs.find(blog => blog.id === blogId)
    );
    if (!blog) {
        return (
            <div className="w-full text-center my-20">
                <Paragraph size="large" className="text-red-500 font-medium">
                    Blog not found.
                </Paragraph>
            </div>
        );
    }


    return (
        <>
            <div className='md:w-[50%] w-full mx-auto my-[100px]'>
                <div className='flex flex-col border rounded-[6px] px-4 pt-[17px] pb-[14px] shadow-[0_4px_6px_var(--shadow-medium-color)]  hover:shadow-[0_4px_6px_var(--shadow-heavy-color)] transition'>
                    {/* Date and Author */}
                    <Paragraph size='normal' className='flex justify-between items-center text-sm font-medium text-light mb-2'>
                        <span>{
                            new Date(blog.publishedDate).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true
                            })}</span>
                        <span>{blog.author}</span>
                    </Paragraph>

                    {/* Blog Title */}
                    <Heading level='h3' className='text-normal font-semibold font-roboto mb-2'>{blog.title}</Heading>

                    {/* Blog content*/}
                    <Paragraph size='large' className='text-light'>{blog.content}</Paragraph>
                </div>
            </div>
        </>
    )
}

export default Blog
