import { SignInButtons } from "@/components/auth/SignInButtons";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-wider">Welcome to Haruka</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to continue
          </p>
        </div>

        <SignInButtons />
      </div>
    </div>
  );
} 