'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ViewAllPostsLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/blog"
      id="view-all-posts"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isHovered ? '12px' : '8px',
        color: 'var(--coral)',
        fontWeight: 700,
        fontSize: '15px',
        textDecoration: 'none',
        transition: 'all 0.2s',
        fontFamily: 'var(--font-body, "DM Sans")',
        marginTop: '16px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      View all posts →
    </Link>
  );
}
