"use client";
import React from 'react'
import { BlogCard } from '@/components/shared'
import { useSelector, useDispatch } from 'react-redux';
import { Heading, Paragraph } from '@/components/ui/typography'

function DisplayBlogs() {
    const blogs = useSelector((state) => state.userBlogs.blogs);
    return (
        <>
            <div className='grid gap-3 grid-cols-[repeat(auto-fit,minmax(340px,1fr))]'>
                {blogs.length > 0 ? (blogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        title={blog.title}
                        content={blog.excerpt}
                        author={blog.author}
                        date={blog.publishedDate}
                    />
                ))) : (
                    <Paragraph size='xl' className="text-light font-[500]">No data to display</Paragraph>
                )}

            </div>
        </>
    )
}

export default DisplayBlogs
