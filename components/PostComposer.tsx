'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface PostComposerProps {
  onPostCreated?: () => void;
}

export default function PostComposer({ onPostCreated }: PostComposerProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Post cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim(), image }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to create post');
        return;
      }

      setContent('');
      setImage('');
      onPostCreated?.();
    } catch (error) {
      console.error('Error creating post:', error);
      setError('An error occurred while creating the post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div
        style={{
          background: 'white',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
          Join our community to share your fitness journey
        </p>
        <Link
          href="/login"
          style={{
            display: 'inline-block',
            padding: '10px 22px',
            background: 'linear-gradient(135deg, #FF4D4D, #FF7070)',
            color: 'white',
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Log In to Post
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'white',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px',
      }}
    >
      {/* Header with avatar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <div style={{ fontSize: '28px' }}>🧑</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '14px', color: '#1A1A2E' }}>
            {session.user?.email || 'User'}
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>Share your thoughts...</div>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind? Share a fitness tip, progress update, or motivation!"
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'inherit',
          minHeight: '100px',
          resize: 'vertical',
          marginBottom: '12px',
        }}
      />

      {/* Image URL input */}
      <input
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Optional: Image URL"
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '8px',
          fontSize: '13px',
          fontFamily: 'inherit',
          marginBottom: '12px',
        }}
      />

      {/* Image preview */}
      {image && (
        <img
          src={image}
          alt="Preview"
          onError={() => setImage('')}
          style={{
            width: '100%',
            maxHeight: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '12px',
          }}
        />
      )}

      {/* Error message */}
      {error && (
        <div
          style={{
            padding: '8px 12px',
            background: 'rgba(255,77,77,0.1)',
            color: '#FF4D4D',
            borderRadius: '6px',
            fontSize: '13px',
            marginBottom: '12px',
          }}
        >
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!content.trim() || isSubmitting}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: content.trim() && !isSubmitting
            ? 'linear-gradient(135deg, #FF4D4D, #FF7070)'
            : '#CCC',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: content.trim() && !isSubmitting ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (content.trim() && !isSubmitting) {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(255,77,77,0.3)';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = '';
          (e.currentTarget as HTMLElement).style.boxShadow = '';
        }}
      >
        {isSubmitting ? 'Posting...' : 'Share Post'}
      </button>
    </form>
  );
}
