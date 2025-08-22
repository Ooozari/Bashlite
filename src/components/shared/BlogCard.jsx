'use client';
import React from 'react'
import { Heading, Paragraph } from '@/components/ui/typography'
import { useRouter } from 'next/navigation';

function BlogCard({ id, title, content, author, date }) {
    const rounter = useRouter()
    return (

        <div className='flex flex-col rounded-[6px] px-4 pt-[17px] pb-[16px]  transition w-full cursor-pointer hover:shadow-[0_4px_6px_var(--shadow-heavy-color)] shadow-[0_4px_6px_var(--shadow-medium-color)]'
            onClick={() => (rounter.push(`blogs/${id}`))}
        >
            {/* Date and Author */}
            <Paragraph size='normal' className='flex justify-between items-center font-medium text-light  mb-3 md:mb-4'>
                <span>{
                    new Date(date).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    })
                }</span>
                <span className='text-normal'>{author}</span>
            </Paragraph>

            {/* Blog Title */}
            <Heading level='h4' className='text-normal capitalize font-bold font-roboto mb-2 line-clamp-3'>
                {title}
            </Heading>

            {/* Blog Excerpt */}
            <Paragraph size='normal' className='text-light'>{content}</Paragraph>
        </div>
    )
}

export default BlogCard
