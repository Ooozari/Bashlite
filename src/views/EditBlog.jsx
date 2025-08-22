"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from '@/components/ui/typography';
import { useFormik } from 'formik';
import { UpdateBlogSchema } from '@/validations';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from '@/components/shared';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlog } from '@/features/blogsSlice';
import { toast } from 'sonner';
import { setSessionHistory } from '@/features/sessionHistorySlice'


function EditBlog({ blogId }) {
    const dispatch = useDispatch();

    const blogData = useSelector(state =>
        state.userBlogs.blogs.find(blog => blog.id === blogId)
    );

    if (!blogData) {
        return <Paragraph>Blog not found.</Paragraph>;
    }

    const updateBlogFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogData?.title || '',
            content: blogData?.content || '',
        },
        validationSchema: UpdateBlogSchema,
        onSubmit: (values) => {

            dispatch(updateBlog({
                id: blogId,
                title: values.title,
                content: values.content,
            }));
            dispatch(
                setSessionHistory({
                    pageName: "Blogs",
                    pageUrl: window.location.pathname,
                    actionType: `Edited a blog: ${blogId}`,
                })
            );
            toast.success("Blog updated successfull")
        },
    });

    return (
        <div className='w-full'>
            <div className='md:w-[75%] w-full mx-auto'>
                <div>
                    {/* Form Heading */}
                    <div className='mb-5 md:mb-6 text-center'>
                        <Heading level='h4' className="font-extrabold font-roboto text-normal">
                            Edit Blog
                        </Heading>
                        <Paragraph size='large' className="text-light font-[500]">
                            Update your blog content and save changes.
                        </Paragraph>
                    </div>

                    <form
                        onSubmit={updateBlogFormik.handleSubmit}
                        className="grid gap-6"
                    >

                        {/* Title */}
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="title">
                                <Paragraph size="label">Blog title</Paragraph>
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter title"
                                value={updateBlogFormik.values.title}
                                onChange={updateBlogFormik.handleChange}
                                onBlur={updateBlogFormik.handleBlur}
                                className="w-full"
                            />
                            {updateBlogFormik.touched.title && updateBlogFormik.errors.title && (
                                <ErrorMessage
                                    error={updateBlogFormik.errors.title}
                                    touched={updateBlogFormik.touched.title}
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="content">
                                <Paragraph size="label">Blog content</Paragraph>
                            </Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Enter blog content..."
                                value={updateBlogFormik.values.content}
                                onChange={updateBlogFormik.handleChange}
                                onBlur={updateBlogFormik.handleBlur}
                                className="w-full"
                            />
                            {updateBlogFormik.touched.content && updateBlogFormik.errors.content && (
                                <ErrorMessage
                                    error={updateBlogFormik.errors.content}
                                    touched={updateBlogFormik.touched.content}
                                />
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            <Paragraph size="btntext">Update Blog</Paragraph>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditBlog;
