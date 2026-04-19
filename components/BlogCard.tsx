import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { Post, categoryMeta } from '@/lib/posts';

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const cat = categoryMeta[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      id={`card-${post.slug}`}
      className="card-hover"
      style={{
        display: 'block',
        background: '#ffffff',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.04)',
        textDecoration: 'none',
        height: '100%',
      }}
    >
      {/* Pinterest-style vertical image (2:3 ratio) */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '133%' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          style={{ transition: 'transform 0.5s ease' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
          }}
        />

        {/* Category badge on image */}
        <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
          <span
            className="pill-badge"
            style={{
              background: 'rgba(255,255,255,0.93)',
              color: '#1A1A2E',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Icon name={cat.icon} size={14} color="#1A1A2E" strokeWidth={2} />
            {cat.label}
          </span>
        </div>

        {/* Read time on image */}
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <span
            className="pill-badge"
            style={{
              background: 'rgba(0,0,0,0.45)',
              color: 'white',
              backdropFilter: 'blur(8px)',
            }}
          >
            {post.readTime}
          </span>
        </div>

        {/* Title overlay at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 16px' }}>
          <h3
            style={{
              color: 'white',
              fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              transition: 'color 0.2s',
              margin: 0,
            }}
          >
            {post.title}
          </h3>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px 20px 24px' }}>
        <p
          style={{
            color: '#6B7280',
            fontSize: '14px',
            lineHeight: 1.65,
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            maxWidth: 'none',
          }}
        >
          {post.excerpt}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF4D4D, #00C9B1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
                flexShrink: 0,
              }}
            >
              {post.author.charAt(0)}
            </div>
            <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'var(--font-body, "DM Sans")' }}>
              {post.author}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: 'var(--font-body, "DM Sans")' }}>
            {post.date}
          </span>
        </div>

        {/* Read more arrow */}
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#FF4D4D',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'var(--font-body, "DM Sans")',
            transition: 'gap 0.2s',
          }}
        >
          Read article
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
