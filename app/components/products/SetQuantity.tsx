"use client";

import { FC } from "react";
import { CartProductType } from "@/interfaces/interfaces";

interface Props {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQuantityIncrease: () => void;
    handleQuantityDecrease: () => void;
};

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded disabled:cursor-not-allowed'

export const SetQuantity:FC<Props> = ({cartProduct, handleQuantityDecrease, handleQuantityIncrease, cartCounter}) => {
  return (
    <div className="flex gap-8 items-center">
        {cartCounter 
            ? null 
            : <div className="font-semibold">Quantity</div> 
        }
        <div className="flex flex-col  items-center gap-1">
            <div className="flex items-center gap-x-4 text-base">
                <button 
                    className={btnStyles} 
                    onClick={handleQuantityDecrease}
                    disabled={cartProduct.quantity === 1}
                > - </button>
                <div>{cartProduct.quantity}</div>
                <button 
                    className={btnStyles} 
                    onClick={handleQuantityIncrease}
                    disabled={cartProduct.quantity >= 10}    
                > + </button>
            </div>
            {cartProduct.quantity >= 10 && <span className="text-xs text-red-600">Oops! Maximun reached</span>}
        </div>
    </div>
  )
}
