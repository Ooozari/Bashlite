"use client";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Heading, Paragraph } from '@/components/ui/typography'
import { useFormik } from 'formik';
import { AddBlogSchema } from '@/validations';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorMessage } from '@/components/shared'

function WriteBlog() {
    const addBlogFormik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        validationSchema: AddBlogSchema,
        onSubmit: (values) => {

        },
    });
    return (
        <>
            <div className='w-full'>
                <div className='md:w-[75%] w-full mx-auto'>
                    <div>
                        {/* Form Heading */}
                        <div className='mb-4 md:mb-6 text-center'>
                            <Heading level='h4' className="font-extrabold font-roboto text-normal">Share Your Thoughts</Heading>
                            <Paragraph size='large' className="text-light font-[500]">
                                Write a new blog post and inspire your readers with your ideas.
                            </Paragraph>
                        </div>
                        <form
                            onSubmit={addBlogFormik.handleSubmit}
                            className="grid gap-6"
                        >
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

                            <Button type="submit" className="w-full">
                                <Paragraph size="btntext">Add Blog</Paragraph>
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default WriteBlog
