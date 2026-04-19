'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import BlogCard from '@/components/BlogCard';
import { getAllPosts, categoryMeta, Category } from '@/lib/posts';

export default function BlogPage() {
  const allPosts = getAllPosts();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  const tabs: { key: Category | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'All Posts', icon: 'posts' },
    { key: 'workouts', label: 'Workouts', icon: 'workouts' },
    { key: 'nutrition', label: 'Nutrition', icon: 'nutrition' },
    { key: 'mindset', label: 'Mindset', icon: 'mindset' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#FEFAF6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#FF6B6B] font-bold text-sm uppercase tracking-widest mb-3">The Blog</p>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1E1E2E] mb-4">
            All the <span className="gradient-text">good stuff</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Workouts, nutrition, mindset — everything you need to build a healthy lifestyle from home.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              role="tab"
              aria-selected={activeCategory === tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                activeCategory === tab.key
                  ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white shadow-lg shadow-[#FF6B6B]/30 scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B6B] hover:text-[#FF6B6B]'
              }`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon name={tab.icon} size={16} color="currentColor" strokeWidth={1.5} />
                {tab.label}
              </div>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeCategory === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {tab.key === 'all' ? allPosts.length : allPosts.filter((p) => p.category === tab.key).length}
              </span>
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div style={{ marginBottom: '16px' }}>
              <Icon name="search" size={48} color="var(--gray-text)" strokeWidth={1.5} />
            </div>
            <p className="text-gray-500 text-lg">No posts found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
