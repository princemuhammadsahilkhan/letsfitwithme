"use client";
'use client';

import { useState } from 'react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 24px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FF4D4D, #FF7070)',
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating decorative elements */}
      <div className="animate-float" style={{ position: 'absolute', top: '10%', left: '10%', width: '80px', height: '80px', borderRadius: '50%', background: '#ff7777' }} />
      <div className="animate-float" style={{ position: 'absolute', bottom: '10%', right: '10%', width: '120px', height: '120px', borderRadius: '50%', background: '#ff7777', animationDelay: '2s' }} />
      <div className="animate-float" style={{ position: 'absolute', top: '50%', right: '25%', width: '48px', height: '48px', borderRadius: '50%', background: '#ff7777', animationDelay: '1s' }} />

      <div
        className="container"
        style={{
          position: 'relative',
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ff7777',
            padding: '8px 16px',
            borderRadius: '999px',
            color: 'white',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'var(--font-body, "DM Sans")',
            marginBottom: '24px',
            border: '1px solid #ff9999',
          }}
        >
          ✨ Join 12,000+ beginners on their journey
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
            fontSize: '40px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.15,
            marginBottom: '16px',
            maxWidth: '100%',
          }}
        >
          Get Your Free<br />
          <span style={{ color: '#FFECCC' }}>7-Day Workout Plan</span>
        </h2>

        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            lineHeight: 1.6,
            marginBottom: '32px',
            fontFamily: 'var(--font-body, "DM Sans")',
            maxWidth: '600px',
            margin: '0 auto 32px auto',
          }}
        >
          Weekly workouts, nutrition tips, and mindset strategies — delivered straight to your inbox. 100% free, unsubscribe anytime.
        </p>

        {submitted ? (
          <div
            className="animate-fade-in"
            style={{
              background: '#ff7777',
              border: '1px solid #ff9999',
              borderRadius: '24px',
              padding: '40px',
              color: 'white',
              width: '100%',
              maxWidth: '450px',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ fontFamily: 'var(--font-heading, "Plus Jakarta Sans")', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>You're in!</h3>
            <p style={{ fontFamily: 'var(--font-body, "DM Sans")', color: 'rgba(255,255,255,0.9)', margin: 0, maxWidth: 'none' }}>Check your inbox — your 7-day plan is on its way!</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '12px',
              width: '100%',
              maxWidth: '480px',
            }}
            className="flex-col sm:flex-row"
            id="newsletter-form"
          >
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                flex: 1,
                padding: '16px 20px',
                borderRadius: '16px',
                color: '#1A1A2E',
                background: 'white',
                border: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                outline: 'none',
                fontFamily: 'var(--font-body, "DM Sans")',
                fontSize: '15px',
                fontWeight: 500,
              }}
              onFocus={(e) => (e.target as HTMLInputElement).style.boxShadow = '0 0 0 4px rgba(255,255,255,0.4)'}
              onBlur={(e) => (e.target as HTMLInputElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'}
            />
            <button
              id="newsletter-submit"
              type="submit"
              disabled={loading}
              style={{
                background: '#1A1A2E',
                color: 'white',
                fontWeight: 700,
                fontFamily: 'var(--font-body, "DM Sans")',
                fontSize: '15px',
                padding: '16px 28px',
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 8px 24px rgba(26,26,46,0.3)',
                cursor: loading ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.background = '#2D2D4A';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.background = '#1A1A2E';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }
              }}
            >
              {loading ? '⏳ Sending...' : "Let's Go! →"}
            </button>
          </form>
        )}

        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '12px',
            fontFamily: 'var(--font-body, "DM Sans")',
            marginTop: '20px',
            maxWidth: 'none',
          }}
        >
          🔒 No spam, ever. Your email stays private.
        </p>
      </div>
    </section>
  );
}
