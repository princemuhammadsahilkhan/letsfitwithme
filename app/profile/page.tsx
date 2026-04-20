'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Load user profile data if available
    if (session?.user) {
      // You can fetch profile data from an API if needed
    }
  }, [session]);

  const handleSaveProfile = async () => {
    if (!session?.user) return;

    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio,
          fitnessGoal,
          avatar,
        }),
      });

      if (response.ok) {
        setSaveMessage('Profile updated successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
              <p className="text-slate-600">Manage your fitness journey</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              Logout
            </button>
          </div>

          <div className="border-b border-slate-200 pb-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Username</p>
                <p className="text-lg font-medium text-slate-900">{session.user.username}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Member Since</p>
                <p className="text-lg font-medium text-slate-900">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-6">Your Fitness Profile</h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-slate-900 mb-2">
                  Avatar (Emoji or URL)
                </label>
                <input
                  id="avatar"
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="e.g., 💪 or URL to image"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-slate-900 mb-2">
                  Fitness Goal
                </label>
                <select
                  id="goal"
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose your goal...</option>
                  <option value="build-muscle">Build Muscle</option>
                  <option value="lose-weight">Lose Weight</option>
                  <option value="improve-endurance">Improve Endurance</option>
                  <option value="increase-flexibility">Increase Flexibility</option>
                  <option value="general-fitness">General Fitness</option>
                </select>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-slate-900 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about your fitness journey..."
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {saveMessage && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    saveMessage.includes('successfully')
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  {saveMessage}
                </div>
              )}

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
