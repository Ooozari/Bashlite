import React from 'react'
import { Heading, Paragraph } from '@/components/ui/typography'
import { DisplayProduct, ManageProducts } from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Product() {

    return (
        <>
            <div className='flex flex-col gap-5'>
                <div>
                    <Heading level='h3' className="font-[700] font-roboto text-normal">Manage Your Products</Heading>
                    <Paragraph className="text-light font-[500] max-w-[600px]">
                        View, add, edit, or remove products in your dashboard. Keep your product catalog up-to-date and organized for better management.
                    </Paragraph>
                </div>

                <Tabs defaultValue="products">
                    <TabsList>
                        <TabsTrigger value="products">All Products</TabsTrigger>
                        <TabsTrigger value="manage">Manage Products</TabsTrigger>
                    </TabsList>
                    <TabsContent value="products"><DisplayProduct /></TabsContent>
                    <TabsContent value="manage"><ManageProducts /></TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default Product
