"use client";
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/blog', label: 'All Posts' },
    { href: '/categories/workouts', label: 'Workouts' },
    { href: '/categories/nutrition', label: 'Nutrition' },
    { href: '/categories/mindset', label: 'Mindset' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'white' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" id="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            className="animate-pulse-glow"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF4D4D, #00C9B1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 900,
              fontSize: '16px',
              fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
              flexShrink: 0,
            }}
          >
            L
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            <span className="gradient-text">LetsFit</span>
            <span style={{ color: '#1A1A2E' }}>With.me</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  display: 'block',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body, "DM Sans")',
                  color: '#444',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                className="nav-link"
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#FF4D4D';
                  (e.target as HTMLElement).style.background = 'rgba(255,77,77,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = '#444';
                  (e.target as HTMLElement).style.background = 'transparent';
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA / Profile */}
        {session ? (
          <Link
            href={`/profile/${session.user?.email}`}
            id="nav-profile"
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF4D4D, #FF7070)',
              color: 'white',
              fontSize: '18px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(255,77,77,0.2)',
            }}
            title={session.user?.email || 'Profile'}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(255,77,77,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(255,77,77,0.2)';
            }}
          >
            👤
          </Link>
        ) : (
          <Link
            href="/#newsletter"
            id="nav-cta"
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #FF4D4D, #FF7070)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'var(--font-body, "DM Sans")',
              padding: '10px 22px',
              borderRadius: '999px',
              boxShadow: '0 4px 16px rgba(255,77,77,0.3)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(255,77,77,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(255,77,77,0.3)';
            }}
          >
            Join Free ✨
          </Link>
        )}

        {/* Hamburger */}
        <button
          id="nav-hamburger"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '2px',
              background: '#1A1A2E',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '2px',
              background: '#1A1A2E',
              borderRadius: '2px',
              transition: 'all 0.3s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '2px',
              background: '#1A1A2E',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          maxHeight: menuOpen ? '400px' : '0',
          opacity: menuOpen ? 1 : 0,
          background: 'white',
          borderTop: menuOpen ? '1px solid #E5E7EB' : 'none',
        }}
      >
        <ul style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', listStyle: 'none' }}>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-body, "DM Sans")',
                  fontWeight: 500,
                  fontSize: '15px',
                  color: '#444',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          {session && (
            <li>
              <Link
                href={`/profile/${session.user?.email}`}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-body, "DM Sans")',
                  fontWeight: 500,
                  fontSize: '15px',
                  color: '#444',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onClick={() => setMenuOpen(false)}
              >
                👤 My Profile
              </Link>
            </li>
          )}
          <li style={{ paddingTop: '8px' }}>
            {session ? (
              <Link
                href="/api/auth/signin"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'rgba(255,77,77,0.1)',
                  color: '#FF4D4D',
                  fontWeight: 700,
                  fontFamily: 'var(--font-body, "DM Sans")',
                  padding: '14px 24px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                }}
                onClick={() => setMenuOpen(false)}
              >
                Account
              </Link>
            ) : (
              <Link
                href="/#newsletter"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #FF4D4D, #FF7070)',
                  color: 'white',
                  fontWeight: 700,
                  fontFamily: 'var(--font-body, "DM Sans")',
                  padding: '14px 24px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                }}
                onClick={() => setMenuOpen(false)}
              >
                Join Free ✨
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
