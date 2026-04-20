'use client';

import { useState } from 'react';
import { Copy, AlertTriangle } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<'username' | 'password' | null>(null);
  const [step, setStep] = useState<'generate' | 'display'>('generate');

  const handleGenerateCredentials = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setPassword(data.password);
        setStep('display');
      } else {
        alert('Failed to generate credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, type: 'username' | 'password') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleContinue = () => {
    // Store credentials in localStorage or session for quick access
    localStorage.setItem('generated_credentials', JSON.stringify({ username, password }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {step === 'generate' ? (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to LetsFitWith.me</h2>
            <p className="text-slate-600 mb-6">
              Get free anonymous credentials to track your fitness journey.
            </p>

            <button
              onClick={handleGenerateCredentials}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4"
            >
              {isLoading ? 'Generating...' : 'Generate My Credentials'}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Skip for Now
            </button>
          </div>
        ) : (
          <div className="p-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 text-sm">Save These Credentials</p>
                <p className="text-amber-800 text-xs mt-1">
                  We cannot recover them if lost. Write them down or save them securely.
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-2">
                  Username
                </p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-mono font-bold text-slate-900 break-all">{username}</p>
                  <button
                    onClick={() => handleCopy(username, 'username')}
                    className="flex-shrink-0 p-2 hover:bg-slate-200 rounded transition-colors"
                    title="Copy username"
                  >
                    <Copy className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                {copied === 'username' && <p className="text-xs text-green-600 mt-2">Copied!</p>}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-2">
                  Password
                </p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-mono font-bold text-slate-900">{password}</p>
                  <button
                    onClick={() => handleCopy(password, 'password')}
                    className="flex-shrink-0 p-2 hover:bg-slate-200 rounded transition-colors"
                    title="Copy password"
                  >
                    <Copy className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                {copied === 'password' && <p className="text-xs text-green-600 mt-2">Copied!</p>}
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-2"
            >
              I've Saved My Credentials
            </button>

            <button
              onClick={() => {
                setStep('generate');
                setUsername('');
                setPassword('');
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Generate Different Credentials
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
