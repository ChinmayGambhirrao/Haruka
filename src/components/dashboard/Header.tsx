"use client"

import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { User } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Header() {
  const { data: session } = useSession()
  const currentTime = new Date()
  const hour = currentTime.getHours()

  const getGreeting = () => {
    if (hour < 12) return "おはようございます" // Good morning
    if (hour < 18) return "こんにちは" // Good afternoon
    return "こんばんは" // Good evening
  }

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-zinc-700/50">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                {getGreeting()}
              </span>
              <span className="text-gray-700 dark:text-gray-300 ml-2">
                {session?.user?.name?.split(" ")[0]} さん
              </span>
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {format(currentTime, "EEEE, MMMM do, yyyy")}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-pink-600 dark:text-pink-400 hover:from-pink-500/20 hover:to-violet-500/20 transition-all duration-300">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 