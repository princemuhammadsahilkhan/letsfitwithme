import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Log in | LetsFit',
  description: 'Log in to your account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center -mt-16 pt-32 pb-16 px-6">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="w-12 h-12 rounded-full bg-[#FF4D4D] flex items-center justify-center text-white text-xl font-bold mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            L
          </Link>
          <h1 className="text-[32px] font-bold text-[#111111] tracking-tight leading-tight">Welcome back</h1>
          <p className="text-[#767676] mt-2">Log in to continue your fitness journey</p>
        </div>

        {/* Clean Form */}
        <form className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#111111] text-sm font-semibold pl-1">Email</label>
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full px-4 py-3.5 rounded-[16px] border border-[#EFEFEF] bg-[#F8F8F8] outline-none hover:border-[#111111] focus:border-[#111111] focus:bg-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#111111] text-sm font-semibold pl-1">Password</label>
            <input 
              type="password" 
              placeholder="Password"
              className="w-full px-4 py-3.5 rounded-[16px] border border-[#EFEFEF] bg-[#F8F8F8] outline-none hover:border-[#111111] focus:border-[#111111] focus:bg-white transition-colors"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#FF4D4D] text-white py-3.5 rounded-full font-bold hover:bg-[#E63E3E] transition-colors mt-2"
          >
            Log in
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <Link href="/signup" className="text-[#111111] font-semibold text-sm hover:underline">
            Don't have an account? Sign up free →
          </Link>
        </div>
      </div>
    </div>
  );
}
