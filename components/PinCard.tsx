"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function PinCard({ post }: { post: any }) {
  const [isHovered, setIsHovered] = useState(false);

  const title = post.title || post.content?.substring(0, 50) + '...' || 'Untitled post';
  const image = post.image || post.coverImage;
  const authorName = post.authorName || post.author?.name || post.authorUsername || 'User';
  const readTime = post.readTime || post.readingTime || '2 min read';
  const linkHref = post.slug ? `/blog/${post.slug}` : `/community`;
  const category = post.category;

  return (
    <Link 
      href={linkHref} 
      className="block break-inside-avoid mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative bg-[#F8F8F8] rounded-2xl overflow-hidden transition-all duration-300 ${
          isHovered ? 'scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.12)]' : 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
        }`}
      >
        {image ? (
          <div className="relative w-full aspect-[3/4]">
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {category && (
              <div className="absolute top-3 left-3 bg-white/90 text-[#111111] px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                {category}
              </div>
            )}
            <div 
              className={`absolute inset-0 bg-black/40 flex flex-col justify-between p-4 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex justify-end">
                <button 
                  className="bg-[#FF4D4D] text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-[#E63E3E] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Save action
                  }}
                >
                  Save
                </button>
              </div>
              <p className="text-white font-bold text-sm line-clamp-2">{title}</p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="text-[#111111] font-bold text-lg leading-tight line-clamp-4">{title}</h3>
            {category && (
              <span className="inline-block mt-3 text-xs font-semibold text-[#FF4D4D] bg-[#FF4D4D]/10 px-2 py-1 rounded-full">
                {category}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 px-1">
        {image && (
          <h3 className="text-[#111111] font-bold text-sm mb-1.5 leading-tight line-clamp-2">{title}</h3>
        )}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FF4D4D] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {authorName.charAt(0).toUpperCase()}
            </div>
            <span className="text-[#767676] text-xs font-medium truncate max-w-[120px]">{authorName}</span>
          </div>
          <span className="text-[#767676] text-xs shrink-0">{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
