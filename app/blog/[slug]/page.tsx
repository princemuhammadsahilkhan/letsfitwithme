import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import { getPostBySlug, getAllPosts, categoryMeta, PostSection } from '@/lib/posts';
import EmailSignup from '@/components/EmailSignup';
import BlogCard from '@/components/BlogCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  };
}

function renderSection(section: PostSection, i: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 key={i} className="prose-blog" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--dark-text)', margin: '2rem 0 1rem' }}>
          {section.content as string}
        </h2>
      );
    case 'subheading':
      return (
        <h3 key={i} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--coral)', margin: '1.5rem 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {section.content as string}
        </h3>
      );
    case 'paragraph':
      return (
        <p key={i} style={{ lineHeight: 1.85, color: '#4B5563', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
          {section.content as string}
        </p>
      );
    case 'list':
      return (
        <ul key={i} style={{ listStyle: 'none', margin: '1rem 0 1.5rem', padding: 0 }}>
          {(section.content as string[]).map((item, j) => (
            <li key={j} style={{ padding: '0.5rem 0 0.5rem 1.75rem', position: 'relative', color: '#4B5563', fontSize: '1.05rem' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--coral)', fontSize: '0.75rem', top: '0.7rem' }}>✦</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case 'tip':
      return (
        <div key={i} style={{ background: 'linear-gradient(135deg, rgba(78,205,196,0.1), rgba(78,205,196,0.05))', borderLeft: '4px solid var(--teal)', padding: '1.25rem 1.5rem', borderRadius: '0 12px 12px 0', margin: '1.5rem 0' }}>
          <p style={{ margin: 0, color: 'var(--teal-dark)', fontWeight: 500, lineHeight: 1.7 }}>{section.content as string}</p>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = categoryMeta[post.category];
  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <div className="pt-20 bg-[#FEFAF6]">
      {/* Post hero */}
      <div className="relative bg-[#1E1E2E] overflow-hidden">
        <div className="absolute inset-0">
          <Image src={post.image} alt={post.title} fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1E2E] via-[#1E1E2E]/80 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <Link href={`/categories/${post.category}`} className="hover:text-white transition-colors">{cat.label}</Link>
          </nav>

          {/* Category badge */}
          <Link href={`/categories/${post.category}`} id={`post-cat-${post.category}`}>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white mb-6">
              <Icon name={cat.icon} size={16} color="white" strokeWidth={2} />
              {cat.label}
            </span>
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-3xl mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-white font-bold text-xs">
                {post.author.charAt(0)}
              </div>
              <span className="text-white/90 font-medium">{post.author}</span>
            </div>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Main content layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Excerpt */}
            <div className="bg-gradient-to-r from-[#FF6B6B]/5 to-[#4ECDC4]/5 border border-[#FF6B6B]/10 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-600 leading-relaxed font-medium italic">{post.excerpt}</p>
            </div>

            {/* Pinterest vertical image */}
            <div className="relative rounded-3xl overflow-hidden mb-10 shadow-xl" style={{ paddingBottom: '150%' }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              {/* Pinterest save button overlay */}
              <div className="absolute top-4 right-4">
                <button
                  id="pinterest-save"
                  className="flex items-center gap-2 bg-[#E60023] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all"
                  aria-label="Save to Pinterest"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                  Save
                </button>
              </div>
            </div>

            {/* Content sections */}
            <div className="prose-blog">
              {post.content.map((section, i) => renderSection(section, i))}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="font-bold text-[#1E1E2E] mb-4">Share this article</p>
              <div className="flex gap-3">
                {[
                  { label: '📌 Pinterest', color: '#E60023' },
                  { label: '🐦 Twitter', color: '#1DA1F2' },
                  { label: '📘 Facebook', color: '#4267B2' },
                ].map((s) => (
                  <button
                    key={s.label}
                    id={`share-${s.label.split(' ')[1].toLowerCase()}`}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-md"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Author card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-2xl font-black text-white">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#1E1E2E]">{post.author}</p>
                    <p className="text-xs text-gray-400">Fitness Writer</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Passionate about making fitness accessible to everyone. Certified in personal training with a focus on beginner-friendly programming.
                </p>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <p className="font-black text-[#1E1E2E] text-sm uppercase tracking-wide mb-4">More like this</p>
                  <div className="space-y-4">
                    {related.map((rp) => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="flex gap-3 group">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                          <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#1E1E2E] line-clamp-2 group-hover:text-[#FF6B6B] transition-colors">
                            {rp.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{rp.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Mini email signup */}
              <div className="bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] rounded-3xl p-6 text-white text-center">
                <div className="text-3xl mb-3">📬</div>
                <h3 className="font-black text-lg mb-2">Get posts like this free</h3>
                <p className="text-white/80 text-sm mb-4">Join 12K+ beginners. No spam, ever.</p>
                <Link href="/#newsletter" className="block bg-white text-[#FF6B6B] font-bold py-2.5 rounded-xl text-sm hover:scale-105 transition-transform">
                  Subscribe Free →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <EmailSignup />
    </div>
  );
}
