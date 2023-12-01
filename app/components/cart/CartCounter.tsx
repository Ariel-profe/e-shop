"use client";

import { useRouter } from "next/navigation";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useCart } from "@/hooks/useCart";

export const CartCounter = () => {

    const router = useRouter();
    const {cartTotalQuantity} = useCart();    

  return (
    <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
        <div>
            <MdOutlineShoppingCart size={24} />
        </div>
        <span className="absolute right-[-10px] top-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
            {cartTotalQuantity }
        </span>
    </div>
  )
}
