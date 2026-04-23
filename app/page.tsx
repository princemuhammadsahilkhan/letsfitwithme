import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import MasonryGrid from '@/components/MasonryGrid';

export const metadata: Metadata = {
  title: 'LetsFit | Discover Your Fit',
  description: 'Workouts, nutrition, and mindset — all in one place.',
};

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white shrink-0 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto px-6 text-center mt-12 mb-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#111111] mb-6">
          Discover Your Fit
        </h1>
        <p className="text-lg md:text-xl text-[#767676] mb-10">
          Workouts, nutrition, and mindset — all in one place.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/explore"
            className="px-8 py-3 bg-[#FF4D4D] text-white rounded-full font-medium hover:bg-[#E63E3E] transition-colors"
          >
            Explore Pins
          </Link>
          <Link
            href="/blog"
            className="px-8 py-3 bg-white text-[#111111] border border-[#EFEFEF] rounded-full font-medium hover:bg-[#F8F8F8] transition-colors"
          >
            Start Reading
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-12">
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 hide-scroll">
          <Link href="/blog" className="px-5 py-2 border border-[#EFEFEF] rounded-full text-sm font-medium text-[#111111] hover:bg-[#F8F8F8] whitespace-nowrap">
            All Posts
          </Link>
          <Link href="/categories/workouts" className="px-5 py-2 border border-[#EFEFEF] rounded-full text-sm font-medium text-[#111111] hover:bg-[#F8F8F8] whitespace-nowrap">
            Workouts 💪
          </Link>
          <Link href="/categories/nutrition" className="px-5 py-2 border border-[#EFEFEF] rounded-full text-sm font-medium text-[#111111] hover:bg-[#F8F8F8] whitespace-nowrap">
            Nutrition 🥗
          </Link>
          <Link href="/categories/mindset" className="px-5 py-2 border border-[#EFEFEF] rounded-full text-sm font-medium text-[#111111] hover:bg-[#F8F8F8] whitespace-nowrap">
            Mindset 🧘
          </Link>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="w-full max-w-[1200px] mx-auto px-6">
        <MasonryGrid posts={posts} />
      </section>
    </main>
  );
}
