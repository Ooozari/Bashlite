import React from 'react'
import Image from 'next/image'
import { Heading, Paragraph } from "@/components/ui/typography";
import { Tags } from 'lucide-react'


function ProductCard({ imgUrl, name, price, category }) {
    return (
        <>
            <div className='flex flex-col mx-auto'>
                {/* Img */}
                <div className="relative h-[240px] w-[300px]">
                    <Image
                        src={imgUrl}
                        alt="product img"
                        fill
                        className="h-full w-full object-cover rounded-t-[4px]"
                    />
                </div>
                
                <div className='bg-card px-4 py-3 rounded-b-[4px] shadow-md flex flex-col gap-[10px]'>
                    {/* Card content */}
                    <div className='flex flex-col'>
                        <Heading level="medium" className="text-normal   font-[800] uppercase">
                            {name}
                        </Heading>

                        <Paragraph size="xxl" className=" text-light font-[700] flex items-baseline-last gap-1.5">
                            <span >
                                <Paragraph size="normal" className='text-extraLight'>
                                Price:
                                </Paragraph>
                                </span> <span>{price}$</span>
                        </Paragraph>
                    </div>

                    <div>
                        <Paragraph size="xs" className=" text-extraLight font-medium flex gap-1.5 items-center">
                            <span>
                                <Tags className='text-primary w-4 h-4 md:w-5 md:h-5' />
                            </span>
                            <span>
                                {category}
                            </span>

                        </Paragraph>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard



