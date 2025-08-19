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
function BlogTable() {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.userBlogs.blogs);
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
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <TableRow key={blog.id}>
                                <TableCell>{blog.id}</TableCell>
                                <TableCell>{blog.title}</TableCell>
                                <TableCell>{blog.author}</TableCell>
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
                                    <div className="inline-flex gap-2 bg-white p-1 justify-end">
                                        <Button
                                            onClick={() => dispatch(deleteBlog(blog.id))}
                                            variant="ghost" className="bg-destructive/20 hover:bg-destructive/10 text-destructive hover:text-destructive h-7 px-1">
                                            <Trash />
                                        </Button>
                                        <Button variant="ghost" className="bg-primary/20 hover:bg-primary/10 text-primary hover:text-primary px-1 h-7">
                                            <Pencil />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (<TableRow>
                        <TableCell colSpan={5} className="text-center">
                            <Paragraph size='xl' className="text-light font-[500]">No data to display</Paragraph>
                            
                        </TableCell>
                    </TableRow>)}




                </TableBody>
            </Table>
        </>
    )
}

export default BlogTable
