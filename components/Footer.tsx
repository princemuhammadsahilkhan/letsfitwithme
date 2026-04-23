"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A2E', color: 'white', fontFamily: 'var(--font-body, "DM Sans")' }}>
      {/* Top wave decoration */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #FF4D4D, #00C9B1, #FF4D4D)' }} />

      <div
        className="container"
        style={{
          paddingTop: '64px',
          paddingBottom: '40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Brand - col 1 */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF4D4D, #00C9B1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
                  fontWeight: 900,
                  color: 'white',
                }}
              >
                L
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
                  fontWeight: 800,
                  fontSize: '20px',
                  color: 'white',
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="gradient-text">LetsFit</span>With.me
              </span>
            </Link>
            <p
              style={{
                color: '#9CA3AF',
                lineHeight: 1.7,
                fontSize: '14px',
                maxWidth: '300px',
                margin: '0 0 24px 0',
              }}
            >
              Your home for beginner-friendly fitness. Real workouts, honest nutrition advice, and the mindset shifts that actually stick.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['📸', '📌', '🎵', '▶️'].map((icon, i) => (
                <button
                  key={i}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#1F2937',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#FF4D4D';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#1F2937';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Categories - col 2 */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
                fontWeight: 700,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#D1D5DB',
                marginBottom: '20px',
                marginTop: '12px',
              }}
            >
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/categories/workouts', label: 'Workouts' },
                { href: '/categories/nutrition', label: 'Nutrition' },
                { href: '/categories/mindset', label: 'Mindset' },
                { href: '/blog', label: 'All Posts' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#FF4D4D'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9CA3AF'}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About - col 3 */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
                fontWeight: 700,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#D1D5DB',
                marginBottom: '20px',
                marginTop: '12px',
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['About', 'Contact', 'Privacy Policy', 'Disclaimer'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#FF4D4D'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9CA3AF'}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #1F2937',
            marginTop: '48px',
            paddingTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '13px',
            color: '#6B7280',
          }}
          className="sm:flex-row"
        >
          <p style={{ margin: 0, maxWidth: 'none' }}>© 2026 LetsFitWith.me · Made with ❤️ for beginners</p>
          <p style={{ margin: 0, maxWidth: 'none' }}>Always consult a healthcare professional before starting a new fitness program.</p>
        </div>
      </div>
    </footer>
  );
}
