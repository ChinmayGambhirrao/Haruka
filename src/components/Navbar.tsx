"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({});
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSocialSignIn = async (provider: string) => {
    try {
      setIsLoading(prev => ({ ...prev, [provider]: true }));
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(prev => ({ ...prev, email: true }));
    // Add email sign-in logic here
    setIsLoading(prev => ({ ...prev, email: false }));
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-10 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.span
              className="text-2xl font-light"
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              春
            </motion.span>
            <span className="font-semibold text-lg">HARUKA</span>
          </Link>

          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#process" className="text-sm hover:text-primary transition-colors">
                Process
              </Link>
              <Link href="#pricing" className="text-sm hover:text-primary transition-colors">
                Pricing
              </Link>
            </nav>

            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">{session.user?.name}</span>
                <Button 
                  variant="outline" 
                  className="rounded-none"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="rounded-none">
                      Sign In
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border-gray-200 dark:border-gray-800">
                  <DialogHeader>
                    <DialogTitle>Sign In to Haruka</DialogTitle>
                    <DialogDescription>
                      Enter your credentials or continue with a provider
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-6 py-4">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-none border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800"
                      onClick={() => handleSocialSignIn('google')}
                      disabled={isLoading.google}
                    >
                      {isLoading.google ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      )}
                      Continue with Google
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full rounded-none border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800"
                      onClick={() => handleSocialSignIn('github')}
                      disabled={isLoading.github}
                    >
                      {isLoading.github ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Github className="mr-2 h-4 w-4" />
                      )}
                      Continue with GitHub
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200 dark:border-gray-800" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-zinc-900 px-2 text-gray-500 dark:text-gray-400">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleEmailSignIn} className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                          <Link 
                            href="/forgot-password"
                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                        disabled={isLoading.email}
                      >
                        {isLoading.email ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Mail className="mr-2 h-4 w-4" />
                        )}
                        Sign In with Email
                      </Button>
                    </form>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Don't have an account?{" "}
                      <Link href="/signup" className="text-gray-900 dark:text-white hover:underline">
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 