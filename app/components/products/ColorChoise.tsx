"use client";

import { FC } from "react";
import { CartProductType, SelectedImgType } from "@/interfaces/interfaces";

interface Props {
    images: SelectedImgType[];
    cartProduct: CartProductType;
    handleColorSelect: (value: SelectedImgType) => void;
};

export const ColorChoise:FC<Props> = ({images, cartProduct, handleColorSelect}) => {
  return (
    <div>
        <div className="flex gap-4 items-center">
            <span className="font-semibold">Color:</span>
            <div className="flex items-center gap-x-1">
                {images.map( img => (
                    <div 
                        key={img.color} 
                        onClick={() => handleColorSelect(img)}
                        className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center cursor-pointer ${
                        cartProduct.selectedImg.color === img.color 
                            ? 'border-[1.5px]'
                            : 'border-none' 
                    }`}>
                        <div style={{background: img.colorCode}} className="h-5 w-5 rounded-full border-[1.2px] border-slate-300"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
