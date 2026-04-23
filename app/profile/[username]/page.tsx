import { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
  title: 'Profile | LetsFit',
  description: 'User profile on LetsFit.',
};

export default function ProfilePage({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username);
  const dummyUser = { username, name: username, followers: [], following: [], posts: [] };

  return (
    <main className="min-h-screen pt-32 pb-16 bg-[#FFFFFF]">
      <div className="max-w-[1200px] mx-auto px-6">
        <ProfileClient user={dummyUser} />
      </div>
    </main>
  );
}
