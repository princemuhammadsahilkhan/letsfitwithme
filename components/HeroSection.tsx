"use client";
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';

export default function HeroSection() {
  const stats = [
    { value: '12K+', label: 'Beginners' },
    { value: '50+', label: 'Free Workouts' },
    { value: '100%', label: 'No Equipment' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '70px',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #FFF8F3 0%, #FEFAF6 50%, #F0FFFE 100%)',
        }}
      />

      {/* Decorative blobs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255,77,77,0.08)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(0,201,177,0.08)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="animate-fade-in-up"
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Text side */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              border: '1px solid #FFE6E6',
              boxShadow: '0 2px 8px rgba(255,77,77,0.1)',
              color: '#FF4D4D',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'var(--font-body, "DM Sans")',
              padding: '8px 18px',
              borderRadius: '999px',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#FF4D4D',
                display: 'inline-block',
                animation: 'pulse-glow 2s infinite',
              }}
            />
            For Real Beginners. No Gym Required.
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
              fontSize: '72px',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#1A1A2E',
              marginBottom: '24px',
              textAlign: 'left',
              letterSpacing: '-0.02em',
            }}
          >
            Fit Starts{' '}
            <br />
            <span className="gradient-text">At Home.</span>
            <br />
            With You.
          </h1>

          <p
            style={{
              color: '#444',
              fontSize: '18px',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '520px',
              fontFamily: 'var(--font-body, "DM Sans")',
            }}
          >
            Beginner workouts, simple nutrition, and the mindset shifts that make
            fitness stick — no equipment, no experience needed.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '40px',
              marginBottom: '40px',
              alignItems: 'flex-start',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label} style={{ flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
                    color: '#FF4D4D',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6B7280',
                    fontFamily: 'var(--font-body, "DM Sans")',
                    fontWeight: 500,
                    marginTop: '4px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/blog"
              id="hero-cta-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #FF4D4D, #FF7070)',
                color: 'white',
                fontWeight: 700,
                fontFamily: 'var(--font-body, "DM Sans")',
                fontSize: '16px',
                padding: '16px 32px',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(255,77,77,0.3)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(255,77,77,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(255,77,77,0.3)';
              }}
            >
              Start Reading 🏃‍♀️
            </Link>
            <Link
              href="/#newsletter"
              id="hero-cta-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'white',
                color: '#1A1A2E',
                fontWeight: 700,
                fontFamily: 'var(--font-body, "DM Sans")',
                fontSize: '16px',
                padding: '16px 32px',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.06)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
              }}
            >
              Get Free 7-Day Plan ✨
            </Link>
          </div>

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px' }}>
            <div style={{ display: 'flex' }}>
              {[
                { color: '#9b7cbf', label: 'Mindset' },
                { color: '#ff6b6b', label: 'Workouts' },
                { color: '#4ecdc4', label: 'Nutrition' },
                { color: '#ffd93d', label: 'Energy' },
              ].map((item, i) => (
                <div
                  key={i}
                  title={item.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    marginLeft: i === 0 ? '0' : '-10px',
                  }}
                />
              ))}
            </div>
            <p
              style={{
                fontSize: '14px',
                color: '#6B7280',
                fontFamily: 'var(--font-body, "DM Sans")',
                maxWidth: 'none',
                margin: 0,
              }}
            >
              <strong style={{ color: '#1A1A2E' }}>4.9 ★</strong> rated by our community
            </p>
          </div>
        </div>

        {/* Image side */}
        <div
          className="animate-fade-in"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            animationDelay: '0.3s',
          }}
        >
          <div
            className="animate-float"
            style={{ position: 'relative', width: '100%', maxWidth: '380px' }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '40px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
                border: '4px solid white',
                aspectRatio: '3 / 4',
              }}
            >
              <Image
                src="/images/hero_workout.png"
                alt="Woman doing yoga at home"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 90vw, 380px"
              />
            </div>

            {/* Floating card 1 */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                left: '-24px',
                top: '25%',
                background: 'white',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.04)',
                animationDelay: '1s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon name="workouts" size={20} color="#ff6b6b" strokeWidth={2} />
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#1A1A2E', maxWidth: 'none', lineHeight: 1.2, margin: 0 }}>Day 7 done!</p>
                  <p style={{ fontSize: '11px', color: '#9CA3AF', maxWidth: 'none', lineHeight: 1.2, margin: 0 }}>Streak going 🔥</p>
                </div>
              </div>
            </div>

            {/* Floating card 2 */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                right: '-24px',
                bottom: '25%',
                background: 'white',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.04)',
                animationDelay: '2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon name="nutrition" size={20} color="#4ecdc4" strokeWidth={2} />
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#1A1A2E', maxWidth: 'none', lineHeight: 1.2, margin: 0 }}>Meal prepped!</p>
                  <p style={{ fontSize: '11px', color: '#00C9B1', maxWidth: 'none', lineHeight: 1.2, margin: 0 }}>5 days ready ✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: '#9CA3AF',
          animation: 'bounce 2s infinite',
        }}
      >
        <span style={{ fontSize: '12px', fontFamily: 'var(--font-body, "DM Sans")', fontWeight: 500 }}>
          Scroll to explore
        </span>
        <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Responsive override for mobile */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-headline {
            font-size: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
