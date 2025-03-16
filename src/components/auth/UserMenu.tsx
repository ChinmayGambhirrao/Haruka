"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  if (status === "unauthenticated") {
    return (
      <Button
        asChild
        className="rounded-none border border-gray-900 dark:border-gray-100"
      >
        <Link href="/auth/signin">Sign In</Link>
      </Button>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2">
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {session?.user?.name?.[0] || "U"}
            </span>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 border border-gray-200 
        dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
        transition-all duration-300 z-50">
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium">{session?.user?.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {session?.user?.email}
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 