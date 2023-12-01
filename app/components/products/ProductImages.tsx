"use client";

import { FC } from "react";

import Image from "next/image";
import { CartProductType, IProduct, SelectedImgType } from "@/interfaces/interfaces";

interface Props {
    cartProdct: CartProductType;
    product: IProduct;
    handleColorSelect: (value: SelectedImgType) => void;
};

export const ProductImages:FC<Props> = ({cartProdct, handleColorSelect, product}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            {product.images.map( img => (
                <div 
                    key={img.colorCode} 
                    className={`relative w-[80%] aspect-square rounded border-teal-300 ${cartProdct.selectedImg.color === img.color ? 'border-[1.5px]' : 'border-none'}`}
                    onClick={() => handleColorSelect(img)}
                >
                    <Image src={img.image} alt={`image-${img.image}`} fill className="object-contain" />
                </div>
            ))}
        </div>
        <div className="col-span-5 relative aspect-square">
            <Image 
                src={cartProdct.selectedImg.image}
                alt={cartProdct.name}
                fill 
                className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]" 
            />
        </div>
    </div>
  )
}
