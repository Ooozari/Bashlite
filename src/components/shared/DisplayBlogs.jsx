"use client";
import React from 'react'

import { BlogCard } from '@/components/shared'

function DisplayBlogs() {
    const blogs = [
        {
            id: 1,
            title: "The Benefits of Desi Ghee in Daily Diet",
            content: "Desi ghee is rich in vitamins and healthy fats. It supports digestion, boosts immunity, and enhances brain function. Learn how to include it in your daily meals for optimal health.",
            author: "Umair Asif",
            date: "2025-08-16",
        },
        {
            id: 2,
            title: "Top 5 Healthy Breakfast Recipes",
            content: "Start your day with nutritious breakfast options like oats, smoothies, and egg-based recipes. These meals are quick, tasty, and packed with energy to kickstart your day.",
            author: "Sarah Khan",
            date: "2025-08-14",
        },
        {
            id: 3,
            title: "How to Store Honey Properly",
            content: "Honey is naturally antibacterial and long-lasting, but improper storage can affect its quality. Keep it in a cool, dry place away from direct sunlight to maintain its flavor and texture.",
            author: "Ali Raza",
            date: "2025-08-10",
        },
        {
            id: 4,
            title: "Healthy Snacking Tips for Busy People",
            content: "Snacking doesn’t have to be unhealthy. Choose nuts, fruits, and yogurt-based snacks to stay energized throughout the day. Avoid processed snacks with added sugar.",
            author: "Fatima Noor",
            date: "2025-08-12",
        },
    ];
    return (
        <>
            <div className='grid gap-3 grid-cols-[repeat(auto-fit,minmax(340px,1fr))]'>
                {blogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        title={blog.title}
                        content={blog.content}
                        author={blog.author}
                        date={blog.date}
                    />
                ))}
            </div>
        </>
    )
}

export default DisplayBlogs
