"use client"
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from 'react-hook-form';

import { MdEmail } from 'react-icons/md';
import { BiSolidUserCircle } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { ModeToggle } from '@/components/ModeToggle';


const Login = () => {
    const { theme } = useTheme()
    console.log(theme);
    const navigate = useRouter();
    const { signIn, signInWithGitHub, signInWithFacebook, signInWithTwitter, signInWithGoogle, loading } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async ({ email, password, username }) => {
        await signIn(email, password);
    };
    // console.log(errors.email, errors.password);

    return (
        <section className='md:flex  
        md:justify-center
        md:items-center
        md:h-screen
        md:pl-[300px]
        md:pr-[250px]

        '>
            <section className='flex flex-col gap-6 p-4'>
                <div className='flex justify-between'>
                    <img src="/devchallenges.svg" alt="" className='w-40 h-6' />
                    <ModeToggle />
                </div>
                <div
                    className='flex flex-col items-center justify-center gap-4 '>
                    <p className='
              text-4xl
              font-bold
              text-left
              italic
              bg-gradient-to-r from-[#3B71CA] to-[#DC4C64] bg-clip-text text-transparent
              leading-[50px]
              '>
                        Login
                    </p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4 pl-4 overflow-hidden border-2 border-black rounded-md'>
                            <MdEmail className='w-6 h-6' />
                            <input className='w-full h-12 pl-4 overflow-hidden focus:outline-none placeholder:pl-2' type="email" placeholder="email" {...register("email", { required: true })} />
                        </div>
                        {errors.email && (
                            <p className="p-1 text-[13px]   text-red-500 font-bold">
                                Please enter a valid email.
                            </p>
                        )}
                        <div className='flex items-center gap-4 pl-4 overflow-hidden border-2 border-black rounded-md'>
                            <RiLockPasswordFill className='w-6 h-6' />
                            <input className='w-full h-12 pl-4 overflow-hidden focus:outline-none placeholder:pl-2' type="password" placeholder="password" {...register("password", { required: true, min: 4, max: 40 })} />
                        </div>
                        {errors.password && (
                            <p className="p-1 text-[13px]   text-red-500 font-bold">
                                Please enter a valid password.
                            </p>
                        )}
                        <button type="submit" placeholder='Sign Up' className='border-none h-12 rounded-md bg-[#2F80ED]'
                        >
                            <p className='text-black '>Sign In</p>
                        </button>
                    </form>
                </div>
                <div className='flex flex-col gap-6'>
                    <p className='text-center text-[13px]  text-[#828282]'>or continue with these social profile</p>
                    <div className='flex justify-center gap-4'>
                        <button className='border-none h-12 rounded-md bg-[#DE0E0E]'
                            onClick={signInWithGoogle}
                        >
                            <img src="/Google.svg" alt="" />
                        </button>
                        <button className='h-12 bg-gray-300 border-none rounded-md'
                            onClick={signInWithGitHub}
                        >
                            <img src="/Gihub.svg" alt="" />
                        </button>
                        <button
                            disabled
                            className='h-12 bg-blue-500 border-none rounded-md'
                            onClick={signInWithFacebook}
                        >
                            <img src="/Facebook.svg" alt="" />
                        </button>
                        {/* <button className='border-none h-12 rounded-md bg-[#A7C7E7]'
                      onClick={signInWithTwitter}
                  >
                      <img src="/Twitter.svg" alt="" />
                  </button> */}
                    </div>
                    <p className='text-center text-[13px] text-[#828282]'>
                        Don't have an account? <span className='text-[#2F80ED] cursor-pointer'
                            onClick={() => navigate.push('/register')}
                        >Register</span>
                    </p>
                </div>
            </section>
        </section>
    )
}

export default Login
