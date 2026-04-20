'use client';

import { useEffect, useState } from 'react';
import SignupModal from '@/components/SignupModal';

interface HomePageClientProps {
  children: React.ReactNode;
}

export function HomePageClient({ children }: HomePageClientProps) {
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    // Check if user has already generated credentials
    const hasGeneratedCredentials = localStorage.getItem('generated_credentials');
    const hasSeenModal = localStorage.getItem('signup_modal_shown');

    if (!hasGeneratedCredentials && !hasSeenModal) {
      setShowSignupModal(true);
      localStorage.setItem('signup_modal_shown', 'true');
    }
  }, []);

  const handleCloseModal = () => {
    setShowSignupModal(false);
  };

  return (
    <>
      <SignupModal isOpen={showSignupModal} onClose={handleCloseModal} />
      {children}
    </>
  );
}
