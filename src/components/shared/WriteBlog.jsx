"use client";
import React from 'react'
import { Button } from "@/components/ui/button"
import { Heading, Paragraph } from '@/components/ui/typography'
import { useFormik } from 'formik';
import { AddBlogSchema } from '@/validations';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorMessage } from '@/components/shared'
import { useDispatch } from 'react-redux';
import { addBlog } from '@/features/blogsSlice';
import { toast } from 'sonner';
import { setSessionHistory } from '@/features/sessionHistorySlice'

function WriteBlog() {
    const dispatch = useDispatch();
    const addBlogFormik = useFormik({
        initialValues: {
            author: '',
            title: '',
            content: '',
        },
        validationSchema: AddBlogSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(addBlog({
                title: values.title,
                content: values.content,
                author: values.author,
            }))
            dispatch(
                setSessionHistory({
                    pageName: "Blogs",
                    pageUrl: window.location.pathname,
                    actionType: `Posted blog ${values.author}`,
                })
            );
            resetForm();
            toast.success("Blog added successfull")
        },
    });
    return (
        <>
            <div className='w-full'>
                <div className='md:w-[75%] w-full mx-auto'>
                    <div>
                        {/* Form Heading */}
                        <div className='mb-5 md:mb-6 text-center'>
                            <Heading level='h4' className="font-extrabold font-roboto text-normal">Share Your Thoughts</Heading>
                            <Paragraph size='large' className="text-light font-[500]">
                                Write a new blog post and inspire your readers with your ideas.
                            </Paragraph>
                        </div>
                        <form
                            onSubmit={addBlogFormik.handleSubmit}
                        >
                            <div className='flex flex-col gap-[30px] sm:gap-[32px] md:gap-[34px] lg:gap-[36px] xl:gap-[38px] 2xl:gap-[40px]'>
                                <div className='flex flex-col gap-[20px] sm:gap-[22px] md:gap-[24px] lg:gap-[26px] xl:gap-[27px] 2xl:gap-[28px]'>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Label htmlFor="author">
                                            <Paragraph size="label">Author name</Paragraph>
                                        </Label>

                                        <div className="relative">
                                            <Input
                                                id="author"
                                                name="author"
                                                placeholder="Enter author name"
                                                value={addBlogFormik.values.author}
                                                onChange={addBlogFormik.handleChange}
                                                onBlur={addBlogFormik.handleBlur}
                                                className="w-full"
                                            />
                                            {addBlogFormik.touched.author && addBlogFormik.errors.author && (
                                                <ErrorMessage
                                                    error={addBlogFormik.errors.author}
                                                    touched={addBlogFormik.touched.author}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <Label htmlFor="title">
                                            <Paragraph size="label">Blog title</Paragraph>
                                        </Label>

                                        <div className="relative">
                                            <Input
                                                id="title"
                                                name="title"
                                                placeholder="Enter title"
                                                value={addBlogFormik.values.title}
                                                onChange={addBlogFormik.handleChange}
                                                onBlur={addBlogFormik.handleBlur}
                                                className="w-full"
                                            />
                                            {addBlogFormik.touched.title && addBlogFormik.errors.title && (
                                                <ErrorMessage
                                                    error={addBlogFormik.errors.title}
                                                    touched={addBlogFormik.touched.title}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <Label htmlFor="price">
                                            <Paragraph size="label">Blog content</Paragraph>
                                        </Label>
                                        <div className='relative'>


                                            <Textarea
                                                id="content"
                                                name="content"
                                                placeholder="Enter blog content..."
                                                value={addBlogFormik.values.content}
                                                onChange={addBlogFormik.handleChange}
                                                onBlur={addBlogFormik.handleBlur}
                                                className="w-full"
                                            />
                                            {addBlogFormik.touched.content && addBlogFormik.errors.content && (
                                                <ErrorMessage
                                                    error={addBlogFormik.errors.content}
                                                    touched={addBlogFormik.touched.content}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">
                                    <Paragraph size="btntext">Post Blog</Paragraph>
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default WriteBlog
