'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import PostCard from '@/components/PostCard';
import FollowButton from '@/components/FollowButton';

interface UserProfile {
  _id: string;
  username: string;
  avatar: string;
  bio: string;
  fitnessGoal: string;
  createdAt: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  isFollowing: boolean;
  isOwnProfile: boolean;
}

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

export default function ProfileClient({ params }: { params: Promise<{ username: string }> }) {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { username: un } = await params;
        setUsername(un);

        // Load profile
        const profileResponse = await fetch(`/api/profile/${un}`);
        if (!profileResponse.ok) {
          setError('User not found');
          setLoading(false);
          return;
        }

        const profileData = await profileResponse.json();
        setProfile(profileData);
        setFollowing(profileData.isFollowing);

        // Load posts
        const postsResponse = await fetch(`/api/posts?skip=0&limit=100`);
        if (postsResponse.ok) {
          const allPosts = await postsResponse.json();
          const userPosts = allPosts.filter(
            (post: Post) => post.authorUsername === un
          );
          setPosts(userPosts);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params]);

  const handleFollowChange = (newFollowing: boolean) => {
    setFollowing(newFollowing);
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '200px', minHeight: '100vh', textAlign: 'center' }}>
        Loading profile...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div style={{ paddingTop: '90px', minHeight: '100vh', textAlign: 'center', padding: '200px 16px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>User not found</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          {error || 'This user does not exist'}
        </p>
        <Link
          href="/community"
          style={{
            display: 'inline-block',
            padding: '10px 22px',
            background: 'var(--coral, #FF4D4D)',
            color: 'white',
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Back to Community
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', background: '#F9FAFB' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Profile card */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', marginBottom: '32px', textAlign: 'center' }}>
          {/* Avatar */}
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>{profile.avatar}</div>

          {/* Username */}
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
            {profile.username}
          </h1>

          {/* Member since */}
          <div style={{ fontSize: '13px', color: '#999', marginBottom: '16px' }}>
            Member since {new Date(profile.createdAt).toLocaleDateString()}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>
              {profile.bio}
            </p>
          )}

          {/* Fitness goal */}
          {profile.fitnessGoal && (
            <div style={{ marginBottom: '16px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  background: 'rgba(255,77,77,0.1)',
                  color: '#FF4D4D',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {profile.fitnessGoal}
              </span>
            </div>
          )}

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>{profile.postCount}</div>
              <div style={{ fontSize: '12px', color: '#999' }}>Posts</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>{profile.followerCount}</div>
              <div style={{ fontSize: '12px', color: '#999' }}>Followers</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>{profile.followingCount}</div>
              <div style={{ fontSize: '12px', color: '#999' }}>Following</div>
            </div>
          </div>

          {/* Action buttons */}
          {session && !profile.isOwnProfile && (
            <FollowButton
              userId={profile._id}
              initialFollowing={following}
              onFollowChange={handleFollowChange}
            />
          )}

          {session && profile.isOwnProfile && (
            <Link
              href="/profile"
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
              Edit Profile
            </Link>
          )}
        </div>

        {/* Posts section */}
        <div>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            Posts
          </h2>

          {posts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 16px',
                background: 'white',
                borderRadius: '12px',
                color: '#999',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
              <p>{profile.username} hasn't posted yet</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          )}
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link
            href="/community"
            style={{
              color: '#FF4D4D',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            ← Back to Community
          </Link>
        </div>
      </div>
    </div>
  );
}
