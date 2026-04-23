'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid username or password');
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g., FitWolf#4821"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors"
          style={{ '--tw-ring-color': 'var(--coral)' } as any}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your 8-character password"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors"
          style={{ '--tw-ring-color': 'var(--coral)' } as any}
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        style={{ backgroundColor: 'var(--coral)' }}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <div className="text-center pt-6 border-t border-gray-100 mt-6">
        <p className="text-gray-500 text-sm mb-2">Don't have an account?</p>
        <Link href="/" className="font-semibold hover:underline transition-colors" style={{ color: 'var(--coral)' }}>
          Sign up for free
        </Link>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--navy)' }}>Welcome Back</h1>
          <p className="text-gray-500">Enter your credentials to login</p>
        </div>

        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
