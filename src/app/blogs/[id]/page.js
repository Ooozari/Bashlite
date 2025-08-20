import { Blog } from '@/views'
import React from 'react'

function Page({ params }) {
    const {id} =  params ;
    return (

        <Blog blogId={id} />
    )
}

export default Page
