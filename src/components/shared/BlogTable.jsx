import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
function BlogTable() {
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[20%]">ID</TableHead>
                        <TableHead className="w-[45%]">Title</TableHead>
                        <TableHead className="w-[20%]">Author</TableHead>
                        <TableHead className="w-[15%]">Date published</TableHead>
                        <TableHead className=""></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs.map((blog) => (
                        <TableRow key={blog.id}>
                            <TableCell>{blog.id}</TableCell>
                            <TableCell>{blog.title}</TableCell>
                            <TableCell>{blog.author}</TableCell>
                            <TableCell>{blog.date}</TableCell>
                            <TableCell className="text-right sticky right-0 z-20">
                                <div className="inline-flex gap-2 bg-white p-1 justify-end">
                                    <Button variant="ghost" className="bg-destructive/20 hover:bg-destructive/10 text-destructive hover:text-destructive h-7 px-1">
                                        <Trash />
                                    </Button>
                                    <Button variant="ghost" className="bg-primary/20 hover:bg-primary/10 text-primary hover:text-primary px-1 h-7">
                                        <Pencil />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default BlogTable
