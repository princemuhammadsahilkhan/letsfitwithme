import { Metadata } from 'next';
import CommunityClient from './CommunityClient';

export const metadata: Metadata = {
  title: 'Community | LetsFit',
  description: 'See what the LetsFit community is sharing.',
};

export default function CommunityPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#F8F8F8] shrink-0">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#111111] mb-4 tracking-tight">Community Feed</h1>
          <p className="text-[#767676]">Share your progress, tips, and favorite routines.</p>
        </div>
        <CommunityClient />
      </div>
    </main>
  );
}
