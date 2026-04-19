import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import BlogCard from '@/components/BlogCard';
import EmailSignup from '@/components/EmailSignup';
import { getPostsByCategory, categoryMeta, Category } from '@/lib/posts';

interface Props {
  params: Promise<{ category: string }>;
}

const validCategories: Category[] = ['workouts', 'nutrition', 'mindset'];

export async function generateStaticParams() {
  return validCategories.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!validCategories.includes(category as Category)) return {};
  const meta = categoryMeta[category as Category];
  return {
    title: `${meta.label} — Beginner Home Fitness Tips`,
    description: `Browse all ${meta.label.toLowerCase()} articles on LetsFitWith.me. Beginner-friendly guides to help you get fit from home.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!validCategories.includes(category as Category)) notFound();

  const cat = category as Category;
  const meta = categoryMeta[cat];
  const posts = getPostsByCategory(cat);

  const descriptions: Record<Category, string> = {
    workouts: 'Effective bodyweight routines you can do in your living room — no gym, no equipment, no excuses.',
    nutrition: 'Simple, sustainable eating strategies that fuel your workouts and support real results.',
    mindset: 'The mental shifts, habit systems, and motivation hacks that make fitness a permanent part of your life.',
  };

  const gradients: Record<Category, string> = {
    workouts: 'from-[#FF6B6B] to-[#FF8E8E]',
    nutrition: 'from-[#4ECDC4] to-[#72DDD6]',
    mindset: 'from-purple-400 to-purple-600',
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#FEFAF6]">
      {/* Category hero */}
      <div className={`bg-gradient-to-br ${gradients[cat]} py-16 px-4 mb-12`}>
        <div className="max-w-6xl mx-auto text-center text-white">
          <div style={{ marginBottom: '16px' }}>
            <Icon name={meta.icon} size={56} color="white" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">{meta.label}</h1>
          <p className="text-white/90 text-lg max-w-xl mx-auto">{descriptions[cat]}</p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} available
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold text-[#1E1E2E] mb-2">Coming soon!</h2>
            <p className="text-gray-500">We're working on more {meta.label.toLowerCase()} content. Subscribe to be notified.</p>
          </div>
        )}

        {/* Category navigation */}
        <div className="mt-16 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <p className="font-black text-[#1E1E2E] text-center mb-6">Explore other topics</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {validCategories.filter((c) => c !== cat).map((c) => {
              const m = categoryMeta[c];
              return (
                <a
                  key={c}
                  href={`/categories/${c}`}
                  id={`switch-to-${c}`}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r ${gradients[c]} hover:scale-105 transition-transform shadow-md`}
                >
                  <Icon name={m.icon} size={18} color="white" strokeWidth={2} />
                  {m.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <EmailSignup />
      </div>
    </div>
  );
}
