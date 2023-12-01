"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { AiOutlineGoogle } from 'react-icons/ai';
import toast from 'react-hot-toast';

import { Heading } from "../ui/Heading";
import { Input } from "../ui/Input";
import { Button } from '../ui/Button';
import { IUser } from '@/interfaces/interfaces';

interface FormData {
    email: '';
    password: '';
};

export const LoginForm = ({user}:{user:IUser | null}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {} as FormData
    });

    useEffect(() => {
      if(user){
        router.push('/cart');
        router.refresh();
      }
    }, [router, user]);
    
    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                router.push('/cart');
                router.refresh();
                toast.success('Logged In');
        }

        if(callback?.error){
            toast.error(callback.error)
        }
        })
    };    

    if(user){
        return <p className='text-center'>Logged in. Redirecting...</p>
    };

  return (
    <>
        <Heading title={"Sign in to E~Shop"} />

        <Button 
            label="Continue with Google" 
            outline 
            icon={AiOutlineGoogle}
            onClick={() => {signIn("google")}}
        />
        <hr className="bg-slate-300 w-full h-px" />

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
            label={isLoading ? "Loading..." : "Login"}
            onClick={handleSubmit(onSubmit)}
        />
        <p className='text-sm'>
            Do not have an account? <Link href={"/register"} className='underline'>Sign Up</Link>
        </p>
    </>
  )
}
