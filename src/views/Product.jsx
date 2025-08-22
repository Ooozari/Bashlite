import React from 'react'
import { Heading, Paragraph } from '@/components/ui/typography'
import { DisplayProduct, ManageProducts } from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Product() {

    return (
        <>
            <div className='flex flex-col gap-[40px] sm:gap-[45px] md:gap-[50px] lg:gap-[55px] xl:gap-[60px] 2xl:gap-[64px]
'>
                <div className='flex flex-col gap-1'>
                    <Heading level='h1' className="font-extrabold font-roboto text-normal leading-snug sm:leading-snug md:leading-[1.2] lg:leading-[1.25] xl:leading-[1.3] 2xl:leading-[1.35]">Manage Your Products</Heading> 
                    <Paragraph size='large' className="text-light font-[500]">
                        View, add, edit, or remove products in your dashboard. Keep your product catalog up-to-date.
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
