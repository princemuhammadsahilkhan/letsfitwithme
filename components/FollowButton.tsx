'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface FollowButtonProps {
  userId: string;
  initialFollowing?: boolean;
  onFollowChange?: (following: boolean) => void;
}

export default function FollowButton({
  userId,
  initialFollowing = false,
  onFollowChange,
}: FollowButtonProps) {
  const { data: session } = useSession();
  const [following, setFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!session) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setFollowing(data.following);
        onFollowChange?.(data.following);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      style={{
        padding: '10px 20px',
        background: following
          ? 'rgba(255,77,77,0.1)'
          : 'linear-gradient(135deg, #FF4D4D, #FF7070)',
        color: following ? '#FF4D4D' : 'white',
        border: following ? '1px solid #FF4D4D' : 'none',
        borderRadius: '999px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity: isLoading ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
      }}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
}
