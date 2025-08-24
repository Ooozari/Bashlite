"use client";
import React, { useEffect } from 'react'
import { Heading, Paragraph } from '@/components/ui/typography'
import { useSelector, useDispatch } from 'react-redux';
import { setSessionHistory } from '@/features/sessionHistorySlice'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { ArrowLeft, SearchX } from 'lucide-react'

function Blog({ blogId }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const blog = useSelector(state =>
        state.userBlogs.blogs.find(blog => blog.id === blogId)
    );
    if (!blog) {
        return (
            <>


                <div className="md:w-[60%] w-full mx-auto my-[100px] flex flex-col gap-6">
                    <div>
                        <Button onClick={() => { router.push('/blogs') }}>
                            <ArrowLeft />
                            Back
                        </Button>
                    </div>
                    <Paragraph size="large" className="text-destructive font-medium flex items-center justify-center gap-1">
                        <span>
                            <SearchX className='text-extraLight'/>
                        </span>
                        <span>
                            Blog not found.
                        </span>


                    </Paragraph>
                </div>
            </>
        );
    }

    useEffect(() => {
        // Add to session history
        dispatch(
            setSessionHistory({
                pageName: "Blogs",
                pageUrl: window.location.pathname,
                actionType: `Reading blog ${blogId}`,
            })
        );
    }, [dispatch, blogId]);

    return (
        <>
            <div className=' '>


                <div className='md:w-[60%] w-full mx-auto my-[100px] flex flex-col gap-6'>
                    <div>
                        <Button onClick={() => { router.push('/blogs') }}>
                            <ArrowLeft />
                            Back
                        </Button>
                    </div>
                    <div className='flex flex-col border rounded-[6px] px-5 pt-[20px] pb-[19px] shadow-[0_4px_6px_var(--shadow-medium-color)]  hover:shadow-[0_4px_6px_var(--shadow-heavy-color)] transition'>
                        {/* Date and Author */}
                        <Paragraph size='normal' className='flex justify-between items-center text-light mb-5 md:mb-[26px]'>
                            <span>{
                                new Date(blog.publishedDate).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true
                                })}</span>
                            <span className='text-normal font-[500]'>{blog.author}</span>
                        </Paragraph>

                        {/* Blog Title */}
                        <Heading level='h3' className='text-normal font-semibold font-roboto mb-3 md:mb-[16px] leading-[1.25] break-all'>{blog.title}</Heading>

                        {/* Blog content*/}
                        <Paragraph size='large' className='text-light leading-[22px] md:leading-[26px] break-all'>{blog.content}</Paragraph>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Blog
