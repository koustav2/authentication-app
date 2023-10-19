'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { BiSolidUserCircle } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { ModeToggle } from '@/components/ModeToggle';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';


const Register = () => {
    const navigate = useRouter();
    const { signUp, signInWithGitHub, signInWithFacebook, signInWithTwitter, signInWithGoogle, loading } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async ({ email, password, username }) => {
        await signUp(email, password, username);
    };
    // console.log(errors.email, errors.password);

    return (
        <section className='md:flex  
        md:justify-center
        md:items-center
        md:h-screen
        md:pl-[450px]
        md:pr-[450px]

        '>
            <section className='flex flex-col gap-8 p-4'>
                <div className='flex justify-between'>
                    <img src="/devchallenges.svg" alt="" className='w-40 h-6' />
                    <ModeToggle />
                </div>
                <div
                    className='flex flex-col items-center justify-center gap-4 '>
                    <p className='
                text-3xl 
                font-bold
                text-left
                leading-[24.52px]
                '>
                        Join thousands of learners from around the world
                    </p>
                    <p className='
                text-xl
                font-light
                text-left
                leading-[21.25px]
                '>
                        Master web development by making real-life projects. There are multiple paths for you to choose
                    </p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4 pl-4 overflow-hidden border-2 border-black rounded-md'>
                            <BiSolidUserCircle className='w-6 h-6' />
                            <input className='w-full h-12 pl-4 rounded-md focus:outline-none placeholder:pl-2' type="text" placeholder="username" {...register("username", { required: true, min: 4 })} />
                        </div>
                        {errors.username && (
                            <p className="p-1 text-[13px]   text-red-500 font-bold">
                                Please enter a username.
                            </p>
                        )}
                        <div className='flex items-center gap-4 pl-4 overflow-hidden border-2 border-black rounded-md'>
                            <MdEmail className='w-6 h-6' />
                            <input className='w-full h-12 pl-4 rounded-md focus:outline-none placeholder:pl-2' type="email" placeholder="email" {...register("email", { required: true })} />
                        </div>
                        {errors.email && (
                            <p className="p-1 text-[13px]   text-red-500 font-bold">
                                Please enter a valid email.
                            </p>
                        )}
                        <div className='flex items-center gap-4 pl-4 overflow-hidden border-2 border-black rounded-md'>
                            <RiLockPasswordFill className='w-6 h-6' />
                            <input className='w-full h-12 pl-4 rounded-md focus:outline-none placeholder:pl-2' type="password" placeholder="password" {...register("password", { required: true, min: 4, max: 40 })} />
                        </div>
                        {errors.password && (
                            <p className="p-1 text-[13px]   text-red-500 font-bold">
                                Please enter a valid password.
                            </p>
                        )}
                        <button type="submit" placeholder='Sign Up' className='border-none h-12 rounded-md bg-[#2F80ED]'
                        >
                            <p className='text-black '>Sign Up</p>
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
                        <button disabled className='h-12 bg-blue-500 border-none rounded-md'
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
                        Already a member? <span className='text-[#2F80ED] cursor-pointer'
                            onClick={() => navigate.push('/login')}
                        >Login</span>
                    </p>
                </div>
            </section>
        </section>
    )
}

export default Register
