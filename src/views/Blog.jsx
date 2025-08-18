import React from 'react'
import { Heading, Paragraph } from '@/components/ui/typography'
function Blog() {

    const blog = {
        id: 1,
        title: "The Benefits of Desi Ghee in Daily Diet",
        content:
            "Desi ghee is rich in vitamins and healthy fats. It supports digestion, boosts immunity, and enhances brain function. Learn how to include it in your daily meals for optimal health. Desi ghee is rich in vitamins and healthy fats. It supports digestion, boosts immunity, and enhances brain function. Learn how to include it in your daily meals for optimal health. Desi ghee is rich in vitamins and healthy fats. It supports digestion, boosts immunity, and enhances brain function. Learn how to include it in your daily meals for optimal health. Desi ghee is rich in vitamins and healthy fats. It supports digestion, boosts immunity, and enhances brain function. Learn how to include it in your daily meals for optimal health. Desi ghee is rich in vitamins and healthy fats. It supports digestion, boosts immunity, and enhances brain function. Learn how to include it in your daily meals for optimal health. Desi ghee is rich in vitamins and healthy fats. It supports digestion, boosts immunity, and enhances brain function. Learn how to include it in your daily meals for optimal health. Desi ghee is rich in vitamins and healthy fats. It supports digestion, boosts immunity, and enhances brain function. Learn how to include it in your daily meals for optimal health.Desi ghee is rich in vitamins and healthy fats. It supports digestion, boosts immunity, and enhances brain function.",
        author: "Umair Asif",
        date: "2025-08-16",
    };

    return (
        <>
            <div className='md:w-[50%] w-full mx-auto my-[100px]'>
                <div className='flex flex-col border rounded-[6px] px-4 pt-[17px] pb-[14px] shadow-[0_4px_6px_var(--shadow-medium-color)]  hover:shadow-[0_4px_6px_var(--shadow-heavy-color)] transition'>
                    {/* Date and Author */}
                    <Paragraph size='normal' className='flex justify-between items-center text-sm font-medium text-light mb-2'>
                        <span>{blog.date}</span>
                        <span>By {blog.author}</span>
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
