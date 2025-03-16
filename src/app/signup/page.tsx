"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(prev => ({ ...prev, email: true }));

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(prev => ({ ...prev, email: false }));
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      // After successful signup, sign in the user
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error instanceof Error ? error.message : "An error occurred during sign up");
    } finally {
      setIsLoading(prev => ({ ...prev, email: false }));
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
        <div className="w-full max-w-md p-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl font-light border border-gray-900 dark:border-gray-100 w-10 h-10 flex items-center justify-center">
                春
              </span>
              <span className="font-semibold text-lg">HARUKA</span>
            </div>
            <h1 className="text-2xl font-light tracking-wider text-gray-900 dark:text-gray-100">
              Create your account
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl font-light border border-gray-900 dark:border-gray-100 w-10 h-10 flex items-center justify-center">
                春
              </span>
              <span className="font-semibold text-lg">HARUKA</span>
            </div>
          </Link>
          <h1 className="text-2xl font-light tracking-wider text-gray-900 dark:text-gray-100">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/signin" className="text-gray-900 dark:text-white hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="grid gap-6">
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
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            )}

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
              Create Account
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-gray-900 dark:text-white hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-gray-900 dark:text-white hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 