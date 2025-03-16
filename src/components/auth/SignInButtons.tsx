"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function SignInButtons() {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-xs mx-auto">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full rounded-none border border-gray-900 dark:border-gray-100 
          bg-white dark:bg-gray-900 text-gray-900 dark:text-white
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition-all duration-300"
      >
        <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
        Continue with Google
      </Button>

      <Button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="w-full rounded-none border border-gray-900 dark:border-gray-100
          bg-gray-900 dark:bg-white text-white dark:text-gray-900
          hover:bg-gray-800 dark:hover:bg-gray-100
          transition-all duration-300"
      >
        <Github className="w-5 h-5 mr-2" />
        Continue with GitHub
      </Button>
    </div>
  );
} 