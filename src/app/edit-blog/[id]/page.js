import React from 'react';
import { EditBlog } from '@/views';

function Page({ params }) {
    const { id } = params;
    return <EditBlog blogId={id} />;
}

export default Page;
