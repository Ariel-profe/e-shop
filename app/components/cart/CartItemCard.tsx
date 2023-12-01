"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { CartProductType } from "@/interfaces/interfaces";
import { SetQuantity } from "../products/SetQuantity";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { useCart } from "@/hooks/useCart";

interface Props {
    product: CartProductType;
};

export const CartItemCard:FC<Props> = ({product}) => {

    const {handleRemoveProductFromCart, handleCartQuantity} = useCart();

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
            <Link href={`/product/${product.slug}`}>
                <div className="relative w-[70px] aspect-square">
                    <Image src={product.selectedImg.image} alt={`${product.name}-image`} fill className="object-contain" />
                </div>
            </Link>
            <div className="flex flex-col justify-between">
                <Link href={`/product/${product.slug}`}>
                    {truncateText(product.name)}
                </Link>
                <div>
                    {product.selectedImg.color}
                </div>
                <div className="w-[70px]">
                    <button 
                        className="text-slate-500 underline"
                        onClick={() => handleRemoveProductFromCart(product)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
        <p className="justify-self-center">{formatPrice(product.price)}</p>
        <div className="justify-self-center">
            <SetQuantity 
                cartProduct={product} 
                handleQuantityIncrease={() => handleCartQuantity(product, 'inc')}  
                handleQuantityDecrease={() => handleCartQuantity(product, 'dec')} 
                cartCounter 
            />
        </div>
        <p className="justify-self-end font-semibold">
            {formatPrice(product.price * product.quantity)}
        </p>
    </div>
  )
}
