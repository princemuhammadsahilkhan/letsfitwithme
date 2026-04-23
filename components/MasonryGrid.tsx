"use client";

import PinCard from './PinCard';

export default function MasonryGrid({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) return <p className="text-center text-[#767676]">Nothing to show yet.</p>;

  return (
    <div className="masonry-grid">
      {posts.map((post) => (
        <div key={post.slug || post._id?.toString() || Math.random()} className="masonry-break-inside">
          <PinCard post={post} />
        </div>
      ))}
    </div>
  );
}
