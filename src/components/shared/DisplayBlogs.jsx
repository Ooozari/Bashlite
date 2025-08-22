"use client";
import React from 'react'
import { BlogCard } from '@/components/shared'
import { useSelector } from 'react-redux';
import { Paragraph } from '@/components/ui/typography'

function DisplayBlogs() {
    const blogs = useSelector((state) => state.userBlogs.blogs);
    return (
        <>
            {blogs.length > 0 ? (blogs.map(blog => (
                <div className={`grid gap-3 justify-center sm:justify-start ${blogs.length <= 1
                    ? "[grid-template-columns:repeat(auto-fit,minmax(0px,400px))]"
                    : "[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]"
                    }`}>
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        content={blog.excerpt}
                        author={blog.author}
                        date={blog.publishedDate}
                    />
                </div>
            ))) : (
                <Paragraph size='xxl' className="text-extraLight text-center font-[500] ">No blogs available. Please post a blog to view it here.</Paragraph>
            )}

        </>
    )
}

export default DisplayBlogs
