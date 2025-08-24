import React from 'react'
import Image from 'next/image'
import { Heading, Paragraph } from "@/components/ui/typography";
import { Tags } from 'lucide-react'


function ProductCard({ imgUrl, name, price, category }) {
    return (
        <>
            <div className='flex flex-col 
            shadow-[-2px_1px_4px_var(--shadow-heavy-color),3px_1px_4px_var(--shadow-light-color)]'>
                {/* Img */}
                <div className="relative h-[240px] w-full">
                    <Image
                        src={imgUrl}
                        alt="product img"
                        fill
                        className="w-full h-full object-cover rounded-t-[4px]"
                    />

                </div>

                <div className='bg-card px-4 py-3 rounded-b-[4px] flex flex-col gap-[10px] w-full '>
                    {/* Card content */}
                    <div className='flex flex-col'>
                        <Heading level="medium" className="text-dark font-[800] uppercase truncate whitespace-nowrap overflow-hidden">
                            {name}
                        </Heading>

                        <Paragraph size="xxl" className="font-[700] flex items-baseline-last gap-1.5">
                            <span >
                                <Paragraph size="normal" className='text-light'>
                                    Price:
                                </Paragraph>
                            </span>
                            <span className='text-priceValue'>{price}$</span>
                        </Paragraph>
                    </div>

                    <div>
                        <Paragraph size="xs" className=" font-medium flex gap-1.5 items-center">
                            <span>
                                <Tags className='text-primary w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] 2xl:w-[20px] 2xl:h-[20px]' />
                            </span>
                            <span className='text-extraLight'>
                                <Paragraph size='normal'>
                                    {category}
                                </Paragraph>

                            </span>
                        </Paragraph>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard



