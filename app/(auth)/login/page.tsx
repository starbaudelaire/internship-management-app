'use client';

import Link from 'next/link';
import { LogIn, GraduationCap } from 'lucide-react';
import { loginUser } from '@/actions/login-user';
import { useTransition, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  // Optional: Add state to show error messages inline
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Reset error state on new submission
    
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await loginUser(formData);

      if (result.success) {
        toast.success(result.message);
        // Redirect based on role
        if (result.role === 'Student') {
          router.push('/student/dashboard');
        } else {
          router.push('/home'); // Fallback
        }
      } else {
        toast.error(result.message);
        setError(result.message); // Set error for inline display
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center mb-6">
          <GraduationCap className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Login ke Akun Anda
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Silakan masukkan detail login Anda
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="anda@contoh.com"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Ingat saya
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Lupa password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              <LogIn className="h-5 w-5 mr-2" />
              {isPending ? 'Memproses...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}