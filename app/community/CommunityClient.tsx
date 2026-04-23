"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import MasonryGrid from '@/components/MasonryGrid';

export default function CommunityClient() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newPost, image: '' }),
    });
    if (res.ok) {
      const added = await res.json();
      setPosts([added, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Composer */}
      {session ? (
        <div className="bg-white rounded-[16px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-4 w-full max-w-[600px] mx-auto">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FF4D4D] text-white flex items-center justify-center font-bold shrink-0">
              {(session.user?.name || session.user?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your fitness journey..."
                className="w-full bg-transparent outline-none resize-none text-[#111111] placeholder-[#767676] min-h-[60px] text-lg"
              />
              <div className="flex justify-between items-center pt-2 border-t border-[#EFEFEF]">
                <button className="text-[#767676] hover:text-[#111111] transition-colors p-2 rounded-full hover:bg-[#F8F8F8]">
                  📷
                </button>
                <button
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="bg-[#FF4D4D] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#E63E3E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[16px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-4 text-center w-full max-w-[600px] mx-auto">
          <h2 className="text-[#111111] font-bold text-xl mb-4">Join the conversation</h2>
          <p className="text-[#767676] mb-6">Log in to share your fitness journey with the community.</p>
          <Link href="/login" className="bg-[#FF4D4D] text-white px-6 py-3 rounded-full font-bold inline-block hover:bg-[#E63E3E] transition-colors">
            Log in to share
          </Link>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-[#767676] font-medium">Loading posts...</div>
      ) : (
        <MasonryGrid posts={posts} />
      )}
    </div>
  );
}
