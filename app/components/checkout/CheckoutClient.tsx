"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

import { useCart } from "@/hooks/useCart";
import { CheckoutForm } from './CheckoutForm';
import { Button } from '../ui/Button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export const CheckoutClient = () => {

  const {cartProducts, paymentIntent, handleSetPaymentIntent} = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // create a payment intent as soon as the page loads
    if(cartProducts){
      setLoading(true);
      setError(false);

      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {'Content-Type':'application-Json'},
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent
        })
      }).then((res) => {
        setLoading(false);

        if(res.status === 401){
          return router.push('/login');
        }

        return res.json();
      }).then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        handleSetPaymentIntent(data.paymentIntent.id)
      }).catch((errror) => {
        setError(true);
        toast.error('Something went wrong')
      })
    };
  }, [cartProducts, paymentIntent, router, handleSetPaymentIntent]);

  const options:StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating'
    }
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value)
  }, []);

  return (
    <div className='w-full'>
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm 
            clientSecret={clientSecret} 
            handleSetPaymentSuccess={handleSetPaymentSuccess} 
          />
        </Elements>
      )}
      {loading && <p className='text-center'>Loading Checkout...</p>}
      {error && <p className='text-center text-rose-500'>Something went wrong</p>}
      {paymentSuccess && (
        <div className='flex items-center flex-col gap-4'>
          <p className='text-teal-500 text-center'>Payment Success</p>
          <div className='max-w-[220px] w-full'>
            <Button label='View Your Orders' onClick={() => router.push('/order')} />
          </div>
        </div>)}
    </div>
  )
}
