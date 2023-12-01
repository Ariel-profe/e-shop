"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { AiOutlineGoogle } from 'react-icons/ai';
import toast from 'react-hot-toast';
import axios from 'axios';

import { Heading } from "../ui/Heading";
import { Input } from "../ui/Input";
import { Button } from '../ui/Button';
import { IUser } from '@/interfaces/interfaces';

interface FormData {
    name: '';
    email: '';
    password: '';
};

export const RegisterForm = ({user}:{user:IUser | null})  => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
       defaultValues : {} as FormData
    });

    useEffect(() => {
        if(user){
          router.push('/cart');
          router.refresh();
        }
      }, [router, user]);

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        axios.post('/api/register', data)
        .then(() => {
            toast.success('User created');

            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback) => {
                if(callback?.ok){
                        router.push('/cart');
                        router.refresh();
                        toast.success('Logged In');
                }

                if(callback?.error){
                    toast.error(callback.error)
                }
            })
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => {
            setIsLoading(false);
        });
    };  
    
    if(user){
        return <p className='text-center'>Logged in. Redirecting...</p>
    };

  return (
    <>
        <Heading title={"Sign up for E~Shop"} />

        <Button 
            label="Sign Up with Google" 
            outline 
            icon={AiOutlineGoogle}
            onClick={() => {signIn("google")}}
        />
        <hr className="bg-slate-300 w-full h-px" />
        <Input 
            id="name"
            type="string"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input 
            id="email"
            label="Email"
            type="string"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input 
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />

        <Button 
            label={isLoading ? "Loading..." : "Sign Up"}
            onClick={handleSubmit(onSubmit)}
        />
        <p className='text-sm'>
            Already have an account? <Link href={"/login"} className='underline'>Login</Link>
        </p>
    </>
  )
}
