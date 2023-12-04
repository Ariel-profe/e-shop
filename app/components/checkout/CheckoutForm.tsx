"use client"

import { FC, FormEvent, useEffect, useState } from "react";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import toast from "react-hot-toast";
import { Heading } from "../ui/Heading";
import { Button } from "../ui/Button";

interface Props {
    clientSecret: string;
    handleSetPaymentSuccess: (value: boolean) => void;
};

export const CheckoutForm:FC<Props> = ({clientSecret, handleSetPaymentSuccess}) => {

    const {cartTotal, handleClearCart, handleSetPaymentIntent} = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const formattedPrice = formatPrice(cartTotal);

    useEffect(() => {
      
        if(!stripe) return;

        if(!clientSecret) return;

        handleSetPaymentSuccess(false);
    }, [stripe, clientSecret, handleSetPaymentSuccess]);

    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault();

        if(!stripe || !elements) return;

        setIsLoading(true);

        stripe.confirmPayment({
            elements, redirect: 'if_required'
        }).then( result => {
            if(!result.error){
                toast.success('Checkout Success!');

                handleClearCart();
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
            }

            setIsLoading(false);
        })
    };
    

  return (
    <form onSubmit={handleSubmit} id="payment-form">
        <div className="mb-6">
            <Heading title={"Enter your details to complete checkout"} />
        </div>
        <h2 className="font-semibold mb-2">Address Information</h2>
        <AddressElement 
            options={{
                mode: "shipping",
                allowedCountries: ['US']
            }}
        />
        <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
        <PaymentElement 
            id="payment-element" 
            options={{layout: "tabs"}}
        />
        <div className="py-4 text-center text-slate-700 text-xl font-bold">
            Total: {formattedPrice}
        </div>
        <Button
            label={isLoading ? 'Processing' : 'Pay now'}
            disabled={isLoading || !stripe || !elements}
            onClick={() => {}}
        />
    </form>
  )
}
