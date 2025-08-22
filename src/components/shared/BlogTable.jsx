'use client';
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
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '@/features/blogsSlice';
import { Heading, Paragraph } from '@/components/ui/typography'
import { useRouter } from 'next/navigation';

function BlogTable() {
    const router = useRouter()
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.userBlogs.blogs);
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[20%]">Author</TableHead>
                        <TableHead className="w-[50%]">Title</TableHead>
                        <TableHead className="w-[20%]">Date published</TableHead>
                        <TableHead className="w-[10%]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <TableRow key={blog.id}>
                                <TableCell>{blog.author}</TableCell>
                                <TableCell>{blog.title}</TableCell>
                                <TableCell>
                                    {
                                        new Date(blog.publishedDate).toLocaleString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true
                                        })
                                    }
                                </TableCell>
                                <TableCell className="text-right sticky right-0 z-20">
                                    <div className="inline-flex gap-2 bg-primary-page-bg p-1 justify-end">
                                        <Button
                                            onClick={() => dispatch(deleteBlog(blog.id))}
                                            variant="ghost" className="bg-destructive/20 hover:bg-destructive/10 text-destructive hover:text-destructive p-[6px]">
                                            <div className='w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] 2xl:w-[20px] 2xl:h-[20px] flex items-center justify-center'>
                                                <Trash className='w-full h-full' />
                                            </div>
                                        </Button>
                                        <Button
                                            onClick={() => router.push(`/edit-blog/${blog.id}`)}
                                            variant="ghost" className="bg-primary/20 hover:bg-primary/10 text-primary hover:text-primary p-[6px]">
                                            <div className='w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] 2xl:w-[20px] 2xl:h-[20px] flex items-center justify-center'>
                                                <Pencil className='w-full h-full' />
                                            </div>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (<TableRow>
                        <TableCell colSpan={5} className="text-center">
                            <Paragraph size='xxl' className="text-extraLight">No data to display</Paragraph>

                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </>
    )
}

export default BlogTable
