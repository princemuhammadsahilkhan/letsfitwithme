import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthSessionProvider } from '@/components/AuthSessionProvider';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'LetsFitWith.me — Beginner Home Workouts & Fitness Tips',
    template: '%s | LetsFitWith.me',
  },
  description:
    'Your beginner-friendly guide to home workouts, healthy nutrition, and the mindset that makes fitness stick. No gym, no equipment, no experience needed.',
  keywords: ['beginner home workouts', 'fitness for beginners', 'home exercise', 'bodyweight workouts', 'nutrition tips', 'fitness mindset'],
  authors: [{ name: 'LetsFitWith.me' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://letsfitWith.me',
    siteName: 'LetsFitWith.me',
    title: 'LetsFitWith.me — Beginner Home Workouts & Fitness Tips',
    description: 'Your beginner-friendly guide to home workouts, healthy nutrition, and the mindset that makes fitness stick.',
    images: [{ url: '/images/hero_workout.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LetsFitWith.me — Beginner Home Workouts',
    description: 'Real workouts, honest nutrition, mindset that sticks.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${dmSans.variable}`}>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: 'var(--font-body, "DM Sans"), sans-serif' }}
      >
        <AuthSessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
