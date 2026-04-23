import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import MasonryGrid from '@/components/MasonryGrid';

export const metadata: Metadata = {
  title: 'Explore | LetsFit',
  description: 'Explore the best fitness content.',
};

export default async function ExplorePage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#FFFFFF]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#111111] mb-8 tracking-tight text-center">Explore Pins</h1>
        <MasonryGrid posts={posts} />
      </div>
    </main>
  );
}
