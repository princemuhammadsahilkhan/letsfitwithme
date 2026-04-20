import type { Metadata } from 'next';
import { CommunityClient } from './CommunityClient';

export const metadata: Metadata = {
  title: 'Community Feed',
  description: 'Connect with other fitness enthusiasts and share your journey',
};

export default function CommunityPage() {
  return <CommunityClient />;
}
