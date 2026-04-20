'use client';

import { useEffect, useState, useCallback } from 'react';
import PostComposer from '@/components/PostComposer';
import PostCard from '@/components/PostCard';

interface Post {
  _id: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likeCount: number;
  commentCount: number;
  isLikedByUser?: boolean;
  createdAt: string;
}

export function CommunityClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadPosts = useCallback(async (skip = 0) => {
    try {
      if (skip === 0) setLoading(true);
      else setIsLoadingMore(true);

      const response = await fetch(`/api/posts?skip=${skip}&limit=20`);
      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();

      if (skip === 0) {
        setPosts(data);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === 20);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handlePostCreated = () => {
    loadPosts(0);
  };

  const handleLoadMore = () => {
    loadPosts(posts.length);
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', background: 'rgba(0,0,0,0.01)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Page header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '32px',
              fontWeight: 800,
              marginBottom: '8px',
            }}
          >
            Community Feed
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Share your fitness journey with others and discover their stories
          </p>
        </div>

        {/* Post composer */}
        <PostComposer onPostCreated={handlePostCreated} />

        {/* Posts */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 16px', color: '#999' }}>
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 16px', color: '#999' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <p>No posts yet. Be the first to share your story!</p>
          </div>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} onPostUpdate={() => loadPosts(0)} />
            ))}

            {/* Load more button */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  style={{
                    padding: '12px 32px',
                    background: 'white',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '999px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: isLoadingMore ? 'not-allowed' : 'pointer',
                    color: '#FF4D4D',
                    transition: 'all 0.2s',
                    opacity: isLoadingMore ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoadingMore) {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,77,77,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'white';
                  }}
                >
                  {isLoadingMore ? 'Loading...' : 'Load More Posts'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
