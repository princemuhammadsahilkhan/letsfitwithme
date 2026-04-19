'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

interface CategoryCardLinkProps {
  href: string;
  id: string;
  icon: string;
  label: string;
  description: string;
  count: string;
}

export default function CategoryCardLink({
  href,
  id,
  icon,
  label,
  description,
  count,
}: CategoryCardLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      key={id}
      href={href}
      id={id}
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        height: '100%',
        padding: '32px 24px',
        borderColor: isHovered ? 'rgba(255,77,77,0.3)' : 'rgba(0,0,0,0.04)',
        background: 'linear-gradient(135deg, white 0%, #FAFAFA 100%)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ marginBottom: '16px', transform: 'translateZ(0)' }}>
        <Icon name={icon} size={48} color="var(--coral)" strokeWidth={1.5} />
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
          fontWeight: 800,
          fontSize: '20px',
          color: 'var(--dark-text)',
          marginBottom: '8px',
          maxWidth: 'none',
          margin: '0 0 8px 0',
        }}
      >
        {label}
      </h3>
      <p
        style={{
          color: 'var(--gray-text)',
          fontSize: '14px',
          marginBottom: '16px',
          maxWidth: 'none',
        }}
      >
        {description}
      </p>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          color: 'var(--coral)',
          fontSize: '14px',
          fontWeight: 700,
        }}
      >
        {count} →
      </span>
      <div
        style={{
          position: 'absolute',
          bottom: '-16px',
          right: '-16px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,77,77,0.05), rgba(0,201,177,0.05))',
          transform: isHovered ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.5s ease',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    </Link>
  );
}
