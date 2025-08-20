import React from 'react'
import { Heading, Paragraph } from '@/components/ui/typography'
import { useRouter } from 'next/navigation';

function BlogCard({ id,title, content, author, date }) {
    const rounter = useRouter()
    return (

        <div className='flex flex-col border rounded-[6px] px-4 pt-[17px] pb-[14px] shadow-[0_4px_6px_var(--shadow-medium-color)]  hover:shadow-[0_4px_6px_var(--shadow-heavy-color)] transition max-w-[384px] cursor-pointer'
        onClick={()=>(rounter.push(`blogs/${id}`))}
        >
            {/* Date and Author */}
            <Paragraph size='normal' className='flex justify-between items-center text-sm font-medium text-light mb-2'>
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
                <span>{author}</span>
            </Paragraph>

            {/* Blog Title */}
            <Heading level='h4' className='text-normal font-semibold font-roboto mb-2'>{title}</Heading>

            {/* Blog Excerpt */}
            <Paragraph size='normal' className='text-light'>{content}</Paragraph>
        </div>
    )
}

export default BlogCard
