"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Timer,
  CheckSquare,
  StickyNote,
  Settings,
  LogOut,
} from "lucide-react"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Focus Room",
    href: "/focus-room",
    icon: Timer,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Notes",
    href: "/notes",
    icon: StickyNote,
  },
  {
    name: "Settings",
    href: "/profile",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-r border-gray-200/50 dark:border-zinc-700/50">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200/50 dark:border-zinc-700/50">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Haruka
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-pink-600 dark:text-pink-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-pink-500/5 hover:to-violet-500/5 hover:text-pink-600 dark:hover:text-pink-400"
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-pink-600 dark:text-pink-400" : ""
                  }`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute right-0 w-1 h-6 bg-gradient-to-b from-pink-500 to-violet-500 rounded-l-full" />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50 dark:border-zinc-700/50">
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors w-full justify-center"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
} 