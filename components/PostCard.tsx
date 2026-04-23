'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface PostCardProps {
  post: {
    _id: string;
    authorUsername: string;
    authorAvatar: string;
    content: string;
    image?: string;
    likeCount: number;
    commentCount: number;
    isLikedByUser?: boolean;
    createdAt: string;
  };
  onPostUpdate?: () => void;
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function PostCard({ post, onPostUpdate }: PostCardProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(post.isLikedByUser || false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!session) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts/${post._id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(data.liked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ fontSize: '28px' }}>{post.authorAvatar}</div>
        <div style={{ flex: 1 }}>
          <Link
            href={`/profile/${post.authorUsername}`}
            style={{
              fontWeight: 600,
              color: '#1A1A2E',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            {post.authorUsername}
          </Link>
          <div style={{ fontSize: '12px', color: '#999' }}>
            {timeAgo(post.createdAt)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ marginBottom: '12px', lineHeight: 1.5, color: '#333', fontSize: '14px' }}>
        {post.content}
      </div>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post image"
          style={{
            width: '100%',
            borderRadius: '8px',
            marginBottom: '12px',
            maxHeight: '300px',
            objectFit: 'cover',
          }}
        />
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid #E5E7EB', paddingTop: '12px' }}>
        <button
          onClick={handleLike}
          disabled={!session || isLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: session ? 'pointer' : 'not-allowed',
            padding: '4px 8px',
            fontSize: '14px',
            color: liked ? '#FF4D4D' : '#999',
            transition: 'color 0.2s',
            opacity: isLoading ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (session) (e.currentTarget as HTMLElement).style.color = '#FF4D4D';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = liked ? '#FF4D4D' : '#999';
          }}
        >
          <Heart size={16} fill={liked ? '#FF4D4D' : 'none'} />
          <span>{likeCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
            fontSize: '14px',
            color: '#999',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#FF4D4D';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#999';
          }}
        >
          <MessageCircle size={16} />
          <span>{post.commentCount}</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && <CommentsList postId={post._id} onPostUpdate={onPostUpdate} />}
    </div>
  );
}

function CommentsList({
  postId,
  onPostUpdate,
}: {
  postId: string;
  onPostUpdate?: () => void;
}) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<
    Array<{
      _id: string;
      authorUsername: string;
      authorAvatar: string;
      content: string;
      createdAt: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments([comment, ...comments]);
        setNewComment('');
        onPostUpdate?.();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
      {/* Comment form */}
      {session ? (
        <form onSubmit={handleSubmitComment} style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              fontSize: '13px',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            disabled={!newComment.trim() || submitting}
            style={{
              padding: '8px 16px',
              background: '#FF4D4D',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: newComment.trim() && !submitting ? 'pointer' : 'not-allowed',
              opacity: newComment.trim() && !submitting ? 1 : 0.5,
            }}
          >
            Post
          </button>
        </form>
      ) : (
        <div style={{ padding: '8px', fontSize: '13px', color: '#999', marginBottom: '12px' }}>
          Log in to comment
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '12px', color: '#999', fontSize: '13px' }}>
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '12px', color: '#999', fontSize: '13px' }}>
          No comments yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {comments.map((comment) => (
            <div key={comment._id} style={{ paddingBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ fontSize: '20px', flexShrink: 0 }}>{comment.authorAvatar}</div>
                <div style={{ flex: 1 }}>
                  <Link
                    href={`/profile/${comment.authorUsername}`}
                    style={{
                      fontWeight: 600,
                      color: '#1A1A2E',
                      textDecoration: 'none',
                      fontSize: '13px',
                    }}
                  >
                    {comment.authorUsername}
                  </Link>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    {comment.content}
                  </div>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                    {timeAgo(comment.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
