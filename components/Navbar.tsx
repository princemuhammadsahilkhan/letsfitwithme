"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#EFEFEF] z-50 flex items-center justify-between px-6">
      {/* Left: Logo */}
      <Link href="/" className="font-bold text-[#111111] text-xl tracking-tight shrink-0 flex items-center gap-1">
        <span className="w-8 h-8 rounded-full bg-[#FF4D4D] flex items-center justify-center text-white text-lg">L</span>
        <span>letsfitWith.me</span>
      </Link>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-[400px] mx-8">
        <input 
          type="text" 
          placeholder="Search workouts, recipes, mindset..." 
          className="w-full bg-[#F8F8F8] border border-transparent hover:border-[#EFEFEF] focus:border-[#EFEFEF] focus:bg-white px-4 py-2.5 rounded-full text-sm text-[#111111] placeholder-[#767676] outline-none transition-colors"
        />
      </div>

      {/* Right: Actions */}
      <nav className="hidden md:flex items-center gap-4 shrink-0 font-medium">
        <Link href="/explore" className="text-[#111111] hover:text-[#767676] text-sm">Explore</Link>
        <Link href="/community" className="text-[#111111] hover:text-[#767676] text-sm">Community</Link>
        
        {session ? (
          <Link href={`/profile/${session.user?.email || 'user'}`} className="w-10 h-10 rounded-full bg-[#FF4D4D] text-white flex items-center justify-center font-bold shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            {(session.user?.name || session.user?.email || 'U').charAt(0).toUpperCase()}
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="px-5 py-2.5 text-[#111111] rounded-full border border-[#EFEFEF] text-sm hover:bg-[#F8F8F8] transition-colors">Log in</Link>
            <Link href="/login" className="px-5 py-2.5 bg-[#FF4D4D] text-white rounded-full border border-transparent text-sm hover:bg-[#E63E3E] transition-colors">Sign up</Link>
          </div>
        )}
      </nav>

      {/* Mobile Toggle */}
      <button className="md:hidden text-[#111111] font-bold text-xl" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-6 flex flex-col gap-4 font-bold md:hidden">
          <Link href="/explore">Explore</Link>
          <Link href="/community">Community</Link>
          <Link href="/login">Account</Link>
        </div>
      )}
    </header>
  );
}
