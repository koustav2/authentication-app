/* eslint-disable @next/next/no-img-element */
'use client'
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Button } from "./ui/button";
import useAuth from '@/hooks/useAuth';
import { ModeToggle } from '@/components/ModeToggle';
import { IoLogOutOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
const Header = () => {
  const { logout, loading, user } = useAuth();
  const navigate = useRouter();

  return (
    <header className='sticky flex items-center justify-between p-6'>
      <div
        onClick={() => navigate.push('/')}
      >
        <img src="/devchallenges.svg" alt="logo" />
      </div>
      <div className='flex items-center justify-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative w-8 h-8 rounded-full">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.photoURL ? user?.photoURL : '/avatars/01.png'} alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-200" align="end" forceMount>
            <DropdownMenuLabel className="font-normal text-gray-500">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-gray-500 hover:bg-gray-700 hover:text-blue-600"
                onClick={() => navigate.push('/profile')}
              >
                Settings & Edit Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 hover:bg-red-600 hover:text-white"
              onClick={logout}
            >
              <p className='flex items-center justify-center'>
                <IoLogOutOutline />
                <span className="ml-2">Logout</span>
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
