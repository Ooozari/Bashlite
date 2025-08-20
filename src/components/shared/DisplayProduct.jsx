'use client';
import React from 'react'
import { ProductCard } from '@/components/shared';
import { Paragraph } from "@/components/ui/typography"; 
import { useSelector } from 'react-redux';

function DisplayProduct() {
  const products = useSelector((state)=> (state.userProducts.products))
 

  return (
    <div className='grid gap-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard
            key={product.id}
            imgUrl={product.imageURL}
            name={product.name}
            price={product.price}
            category={product.category}
          />
        ))
      ) : (
        <Paragraph size='xl' className="text-light font-[500]">
          No data to display
        </Paragraph>
      )}
    </div>
  )
}

export default DisplayProduct;
