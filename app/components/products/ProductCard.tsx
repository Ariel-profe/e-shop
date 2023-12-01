"use client";

import { FC } from 'react';
import Image from 'next/image';
import { IProduct } from '@/interfaces/interfaces';
import { truncateText } from '../../../utils/truncateText';
import { formatPrice } from '@/utils/formatPrice';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';

export const ProductCard:FC<{product: IProduct}> = ({product}) => {

    const {slug, images, name, price, reviews } = product;

    const router = useRouter();

    const productRating = reviews.reduce( (acc, item) => item.rating + acc, 0) / reviews.length;

  return (
    <div 
        className='col-span-1 bg-white cursor-pointer border border-slate-100 rounded-md p-2 transition hover:scale-105 text-center text-sm'
        onClick={() => router.push(`/product/${slug}`)}
    >
        <div className='flex flex-col items-center w-full gap-1'>
            <div className='aspect-square overflow-hidden relative w-full'>
                <Image src={images[0].image} alt={`${name}-image`} fill className='object-contain w-full h-full' />
            </div>
            <div className='mt-3 capitalize'>
                {truncateText(name)}
            </div>
            <div>
                <Rating value={productRating} readOnly />
            </div>
            <div>
                {reviews.length} reviews
            </div>
            <div className='font-semibold'>
                {formatPrice(price)}
            </div>
        </div>
    </div>
  )
}
