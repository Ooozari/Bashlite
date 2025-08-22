"use client";
import React from 'react'
import { BlogCard } from '@/components/shared'
import { useSelector } from 'react-redux';
import { Paragraph } from '@/components/ui/typography'

function DisplayBlogs() {
    const blogs = useSelector((state) => state.userBlogs.blogs);
    return (
        <>
            <div className={`grid gap-3 justify-center sm:justify-start ${blogs.length <= 1
                ? "[grid-template-columns:repeat(auto-fit,minmax(0px,400px))]"
                : "[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]"
                }`}>
                {blogs.length > 0 ? (blogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        content={blog.excerpt}
                        author={blog.author}
                        date={blog.publishedDate}
                    />
                ))) : (
                    <Paragraph size='xxl' className="text-extraLight text-center font-[500]">No data to display</Paragraph>
                )}

            </div>
        </>
    )
}

export default DisplayBlogs
