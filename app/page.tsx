import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import BlogCard from '@/components/BlogCard';
import EmailSignup from '@/components/EmailSignup';
import CategoryCardLink from '@/components/CategoryCardLink';
import ViewAllPostsLink from '@/components/ViewAllPostsLink';
import Icon from '@/components/Icon';
import { getAllPosts, categoryMeta } from '@/lib/posts';
import { HomePageClient } from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Home — Beginner Home Workouts & Fitness Tips',
  description:
    'Start your fitness journey from home. Beginner-friendly workouts, simple nutrition tips, and the mindset shifts that make fitness stick.',
};

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  const categories = [
    { key: 'workouts' as const, description: 'Bodyweight routines you can do anywhere', count: '20+ workouts' },
    { key: 'nutrition' as const, description: 'Simple eating strategies that fuel results', count: '15+ guides' },
    { key: 'mindset' as const, description: 'Build habits that stick for the long haul', count: '12+ articles' },
  ];

  return (
    <HomePageClient>
      <HeroSection />

      {/* Categories strip */}
      <section className="section bg-white">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Explore Topics</span>
            <h2 className="section-title" style={{ maxWidth: 'none', margin: '0 0 16px 0' }}>
              Everything you need to <span className="gradient-text">get started</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--card-gap)',
            }}
          >
            {categories.map((cat) => {
              const meta = categoryMeta[cat.key];
              return (
                <CategoryCardLink
                  key={cat.key}
                  href={`/categories/${cat.key}`}
                  id={`category-${cat.key}`}
                  icon={meta.icon}
                  label={meta.label}
                  description={cat.description}
                  count={cat.count}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            <span className="section-label">Fresh Content</span>
            <h2 className="section-title" style={{ maxWidth: 'none', margin: '0 0 16px 0' }}>
              Latest from the blog
            </h2>
            <ViewAllPostsLink />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--card-gap)',
            }}
          >
            {featured.map((post) => (
              <div key={post.slug} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <BlogCard post={post} featured />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / motivational break */}
      <section className="section" style={{ background: '#1A1A2E', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>💬</div>
          <blockquote
            style={{
              fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
              fontSize: '32px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.25,
              marginBottom: '24px',
              margin: '0 0 24px 0',
              padding: 0,
              maxWidth: 'none',
            }}
          >
            "You don't have to be great to start, but you have to start to be great."
          </blockquote>
          <cite
            style={{
              fontFamily: 'var(--font-body, "DM Sans")',
              color: 'var(--teal)',
              fontWeight: 600,
              fontSize: '16px',
              fontStyle: 'normal',
            }}
          >
            — Zig Ziglar
          </cite>
        </div>
      </section>

      {/* More posts */}
      {rest.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 className="section-title" style={{ maxWidth: 'none', margin: '0 0 16px 0' }}>More to explore</h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--card-gap)',
              }}
            >
              {rest.map((post) => (
                <div key={post.slug} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why us section */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title" style={{ maxWidth: 'none', margin: '0 0 16px 0' }}>
              Why <span className="gradient-text">LetsFitWith.me</span>?
            </h2>
            <p
              style={{
                color: 'var(--gray-text)',
                margin: '0 auto',
                maxWidth: '600px',
              }}
            >
              We cut through the noise and give you exactly what beginners need — simple, science-backed, and actually doable.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--card-gap)',
            }}
          >
            {[
              { icon: 'target', title: 'Beginner First', desc: 'Every piece of content is designed for people starting from zero.' },
              { icon: 'home', title: 'Home-Friendly', desc: 'No gym, no equipment, no commute. Just you and your living room.' },
              { icon: 'book', title: 'Evidence-Based', desc: 'Everything is grounded in exercise science you can actually trust.' },
              { icon: 'heart', title: 'Judgment-Free', desc: "We celebrate every small win. Progress over perfection, always." },
            ].map((item) => (
              <div
                key={item.title}
                className="card card-hover"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--light-gray)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Icon name={item.icon} size={32} color="var(--coral)" strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading, "Plus Jakarta Sans")',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: 'var(--dark-text)',
                    marginBottom: '8px',
                    maxWidth: 'none',
                    margin: '0 0 8px 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: 'var(--gray-text)',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    maxWidth: 'none',
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailSignup />
    </HomePageClient>
  );
}
