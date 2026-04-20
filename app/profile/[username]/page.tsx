import type { Metadata } from 'next';
import { ProfileClient } from './ProfileClient';

export const metadata: Metadata = {
  title: 'Community Profile',
  description: 'View user profile and their posts',
};

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  return <ProfileClient params={params} />;
}
