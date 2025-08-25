'use client';
import { Heading, Paragraph } from '@/components/ui/typography';
import { SearchX } from 'lucide-react'
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col  justify-center items-center text-center bg-primary-page-bg w-full h-[100vh] gap-10">
      <Heading level='h1' className='font-roboto text-blue-600 font-[900]'>
        404 {':('}
      </Heading>
      <span ><SearchX className='text-extraLight w-20 h-20' /></span>
      <Paragraph size='xl' className='text-light font-medium'>
        Page not found <Link href='/' className='text-positive font-[600] underline'>back to home</Link>
      </Paragraph>
    </div>
  );
}
