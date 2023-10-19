'use client'
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import useAuth from '@/hooks/useAuth';
import { useTheme } from "next-themes"

export default function Home() {
  const {
    theme,
  } = useTheme()
  return (
    <main className={`min-h-screen p-4
      ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    `}>

      <Header />
      <Profile />

    </main>
  )
}
