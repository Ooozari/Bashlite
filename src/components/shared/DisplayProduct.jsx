'use client';
import React from 'react'
import { ProductCard } from '@/components/shared';
import { Paragraph } from "@/components/ui/typography";
import { useSelector } from 'react-redux';

function DisplayProduct() {
  const products = useSelector((state) => (state.userProducts.products))

  return (


    <>
      {products.length > 0 ? (
        <div className={`grid gap-5 justify-center sm:justify-start ${products.length <= 2
          ? "[grid-template-columns:repeat(auto-fit,minmax(260px,300px))]"
          : "[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]"
          }`}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              imgUrl={product.imageURL}
              name={product.name}
              price={product.price}
              category={product.category}
            />
          ))}
        </div>
      ) : (
        <Paragraph size='xxl' className="text-extraLight text-center font-[500]">
          No products available. Please add a product to view it here.
        </Paragraph>
      )}

    </>

  )
}

export default DisplayProduct;
