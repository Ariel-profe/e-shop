"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { useCart } from "@/hooks/useCart"
import { Heading } from "../ui/Heading";
import { Button } from "../ui/Button";
import { CartItemCard } from "./CartItemCard";
import { formatPrice } from "@/utils/formatPrice";

export const CartClient = () => {

    const {cartProducts, isLoaded, handleClearCart, cartTotal} = useCart();

    if(!isLoaded){return <></>}

    if(!cartProducts || cartProducts.length === 0){
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                    <MdArrowBack />
                    <span>Start shopping</span>
                    </Link>
                </div>
            </div>
        )
    };

  return (
    <div>
        <Heading title="Shopping Cart" center />
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
            <div className="uppercase col-span-2 justify-self-start">product</div>
            <div className="uppercase justify-self-center">price</div>
            <div className="uppercase justify-self-center">quantity</div>
            <div className="uppercase justify-self-end">total</div>
        </div>
        <div>
            {cartProducts && cartProducts.map( (product) => (
                <CartItemCard key={product.id} product={product} />
            ))}
        </div>
        <div className="flex justify-between items-center border-t-[1.5px] border-slate-200 py-4 gap-4">
            <div className="w-[90px]">
                <Button label="Clear cart" onClick={handleClearCart} small outline />
            </div>
            <div className="text-sm flex flex-col gap-1 items-start">
                <div className="flex justify-between w-full text-base font-semibold">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-slate-500">Taxes and shipping calculate at checkout</p>
                <Button label="Checkout" onClick={() => {}} />
                <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                    <MdArrowBack />
                    <span>Continue shopping</span>
                </Link>
            </div>
        </div>
    </div>
  )
}
