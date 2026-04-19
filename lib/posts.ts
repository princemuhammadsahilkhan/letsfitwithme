export type Category = 'workouts' | 'nutrition' | 'mindset';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  image: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  content: PostSection[];
}

export interface PostSection {
  type: 'heading' | 'subheading' | 'paragraph' | 'list' | 'tip';
  content: string | string[];
}

export const categoryMeta: Record<Category, { label: string; icon: string; color: string; bg: string }> = {
  workouts: { label: 'Workouts', icon: 'workouts', color: 'text-coral', bg: 'bg-coral/10' },
  nutrition: { label: 'Nutrition', icon: 'nutrition', color: 'text-teal', bg: 'bg-teal/10' },
  mindset: { label: 'Mindset', icon: 'mindset', color: 'text-purple-500', bg: 'bg-purple-100' },
};

export const posts: Post[] = [
  {
    slug: 'best-beginner-home-workouts',
    title: '10 Best Beginner Home Workouts (No Equipment Needed)',
    excerpt: 'Ready to start your fitness journey but not sure where to begin? These 10 beginner-friendly bodyweight exercises will build strength, boost energy, and get you moving — all from your living room.',
    category: 'workouts',
    image: '/images/post_beginner_workouts.png',
    readTime: '7 min read',
    date: 'April 15, 2026',
    author: 'Alex Rivera',
    tags: ['beginner', 'bodyweight', 'home workout', 'no equipment'],
    content: [
      { type: 'paragraph', content: 'Starting a fitness journey can feel overwhelming — especially when you feel like you need a gym membership, expensive equipment, or years of experience. The truth? All you need is your body and a little floor space.' },
      { type: 'heading', content: 'Why Bodyweight Training Works' },
      { type: 'paragraph', content: 'Bodyweight exercises are incredibly effective for beginners because they teach your body how to move correctly before adding any external load. You build functional strength, improve flexibility, and develop the mind-muscle connection — all essentials for long-term progress.' },
      { type: 'heading', content: 'The 10 Best Beginner Exercises' },
      { type: 'subheading', content: '1. Bodyweight Squats' },
      { type: 'paragraph', content: 'The squat is the king of lower body movements. Stand with feet shoulder-width apart, lower your hips back and down as if sitting into a chair, keeping your chest tall. Aim for 3 sets of 10–15 reps.' },
      { type: 'subheading', content: '2. Modified Push-Ups' },
      { type: 'paragraph', content: 'Start on your knees if full push-ups are too challenging. Keep your body in a straight line from knees to head. This builds chest, shoulder, and tricep strength beautifully.' },
      { type: 'subheading', content: '3. Glute Bridges' },
      { type: 'paragraph', content: 'Lie on your back with knees bent, feet flat on the floor. Press through your heels to lift your hips toward the ceiling. Squeeze your glutes at the top. This activates often-dormant glute muscles.' },
      { type: 'list', content: ['4. Walking Lunges — great for balance and leg strength', '5. Plank Hold — builds core stability (start with 20 seconds)', '6. High Knees — elevates heart rate for cardio benefit', '7. Mountain Climbers — full-body cardio and core combo', '8. Bird Dog — improves balance and back health', '9. Wall Sit — isometric leg strengthening', '10. Standing Calf Raises — often overlooked but vital'] },
      { type: 'tip', content: 'Pro Tip: Focus on form over speed. 8 perfect reps beats 20 sloppy ones every time. Record yourself occasionally to check your technique.' },
      { type: 'heading', content: 'Your First Week Plan' },
      { type: 'paragraph', content: 'Monday: Squats + Push-ups + Glute Bridges. Wednesday: Lunges + Plank + Bird Dog. Friday: Full circuit of all 10 exercises. Rest on other days or go for a 20-minute walk.' },
      { type: 'paragraph', content: 'Remember: consistency over intensity. Showing up 3 days a week for a month will always outperform one brutal workout you never repeat.' },
    ],
  },
  {
    slug: '30-day-bodyweight-challenge',
    title: '30-Day Bodyweight Challenge: Transform Your Body at Home',
    excerpt: 'A structured 30-day plan that progressively builds strength and endurance using nothing but your bodyweight. Perfect for beginners who want real results.',
    category: 'workouts',
    image: '/images/post_30day_challenge.png',
    readTime: '9 min read',
    date: 'April 10, 2026',
    author: 'Alex Rivera',
    tags: ['30-day challenge', 'bodyweight', 'progressive', 'home workout'],
    content: [
      { type: 'paragraph', content: 'A 30-day challenge is one of the most powerful tools for building a fitness habit. The structure removes decision fatigue, progressive overload builds genuine strength, and the finite endpoint makes it mentally manageable.' },
      { type: 'heading', content: 'How the Challenge Works' },
      { type: 'paragraph', content: 'Each week, you\'ll add slightly more volume or difficulty to your workouts. This principle — progressive overload — is the single most important concept in fitness. Without it, your body adapts and progress stalls.' },
      { type: 'list', content: ['Week 1: Foundation (2 sets, 8-10 reps)', 'Week 2: Build (3 sets, 10-12 reps)', 'Week 3: Intensity (3 sets, 12-15 reps + cardio)', 'Week 4: Peak (4 sets, 15+ reps, circuit style)'] },
      { type: 'heading', content: 'Daily Workout Structure' },
      { type: 'paragraph', content: 'Each session takes 20–30 minutes. Start with a 3-minute warm-up (arm circles, hip rotations, light marching). End with a 3-minute cool-down and gentle stretching. The workout itself is the middle 15–20 minutes.' },
      { type: 'tip', content: 'Track your progress in a simple notebook or your phone\'s notes app. Recording your sets and reps creates accountability and lets you see how far you\'ve come.' },
      { type: 'heading', content: 'What to Expect' },
      { type: 'paragraph', content: 'By Day 7: soreness will reduce and movements will feel more natural. By Day 14: you\'ll notice improved endurance and strength. By Day 21: your posture and confidence will visibly improve. By Day 30: you\'ll have built a genuine fitness habit — the greatest result of all.' },
    ],
  },
  {
    slug: 'healthy-meal-prep-beginners',
    title: 'Healthy Meal Prep for Fitness Beginners: Your Complete Guide',
    excerpt: 'Nutrition doesn\'t have to be complicated. Learn how to meal prep in 2 hours on Sunday so you have healthy, delicious food ready all week — supporting your workout goals effortlessly.',
    category: 'nutrition',
    image: '/images/post_meal_prep.png',
    readTime: '8 min read',
    date: 'April 8, 2026',
    author: 'Sam Chen',
    tags: ['meal prep', 'nutrition', 'beginners', 'healthy eating'],
    content: [
      { type: 'paragraph', content: 'You can\'t out-train a bad diet — and you can\'t maintain a great diet without a system. Meal prep is that system. Spend 2 hours on Sunday, eat well all week. Simple math that most people skip.' },
      { type: 'heading', content: 'The Beginner\'s Meal Prep Formula' },
      { type: 'paragraph', content: 'Forget complicated macros and calorie counting when you\'re starting out. Instead, focus on filling your plate with the right proportions: half vegetables, one quarter lean protein, one quarter complex carbohydrates.' },
      { type: 'list', content: ['Proteins: chicken breast, canned tuna, hard-boiled eggs, Greek yogurt', 'Carbs: brown rice, sweet potatoes, oats, whole wheat pasta', 'Vegetables: broccoli, spinach, bell peppers, zucchini, carrots', 'Healthy fats: avocado, olive oil, nuts, seeds'] },
      { type: 'heading', content: 'Your 2-Hour Sunday Prep Session' },
      { type: 'paragraph', content: '0:00 — Start rice or sweet potatoes (these take longest). 0:10 — Season and bake chicken breast (400°F, 25 min). 0:20 — Chop all vegetables. 0:35 — Steam or roast veggies. 0:50 — Hard-boil eggs. 1:00 — Portion everything into containers. 1:30 — Label and refrigerate. Done!' },
      { type: 'tip', content: 'Invest in glass meal prep containers. They\'re microwave-safe, last for years, and make your food look so good you\'ll actually want to eat it.' },
      { type: 'heading', content: 'Fitness-Focused Meal Ideas' },
      { type: 'paragraph', content: 'Pre-workout: banana + peanut butter, or oats with berries. Post-workout: chicken + rice + veggies, or Greek yogurt parfait. Snacks: hard-boiled eggs, apple + almond butter, edamame, or a small handful of mixed nuts.' },
    ],
  },
  {
    slug: 'pre-workout-snack-ideas',
    title: '15 Pre-Workout Snack Ideas That Actually Fuel Your Workout',
    excerpt: 'Eating the right foods before your home workout can dramatically boost your performance and energy. Here are 15 quick, delicious pre-workout snacks to power you through any session.',
    category: 'nutrition',
    image: '/images/post_preworkout_snacks.png',
    readTime: '5 min read',
    date: 'April 5, 2026',
    author: 'Sam Chen',
    tags: ['pre-workout', 'snacks', 'nutrition', 'energy'],
    content: [
      { type: 'paragraph', content: 'What you eat before a workout can make the difference between a crushing session and dragging yourself through the motions. The goal: easily digestible carbohydrates for quick energy, with a little protein to support muscle.' },
      { type: 'heading', content: 'Timing Matters' },
      { type: 'paragraph', content: 'Eat a larger snack 1.5–2 hours before training, or a smaller, easily digestible snack 30–45 minutes before. Eating too close to exercise with the wrong foods can cause stomach cramps and sluggishness.' },
      { type: 'heading', content: '15 Best Pre-Workout Snacks' },
      { type: 'list', content: ['Banana + 1 tbsp peanut butter (classic and perfect)', 'Oatmeal with berries and honey', 'Greek yogurt with granola', 'Apple slices with almond butter', 'Rice cakes with avocado', 'Whole wheat toast with banana', 'Energy balls (oats, honey, peanut butter, chocolate chips)', 'Smoothie: banana + spinach + almond milk + protein powder', 'Dates stuffed with almond butter', 'Cottage cheese with pineapple', 'Small bowl of overnight oats', 'Handful of trail mix (nuts + dried fruit)', 'Hard-boiled egg on whole wheat crackers', 'Sweet potato toast with almond butter', 'Chocolate milk (seriously! great ratio of carbs to protein)'] },
      { type: 'tip', content: 'Avoid high-fat, high-fiber foods right before working out. Things like big salads, beans, or heavy cheese can slow digestion and make you feel sluggish during training.' }
    ],
  },
  {
    slug: 'stay-motivated-fitness-journey',
    title: 'How to Stay Motivated on Your Fitness Journey (Even When You Don\'t Feel Like It)',
    excerpt: 'Motivation is unreliable — discipline and systems are what actually keep you showing up. Here\'s the mindset shift and practical strategies that will make fitness a lifelong habit.',
    category: 'mindset',
    image: '/images/post_motivation.png',
    readTime: '6 min read',
    date: 'April 3, 2026',
    author: 'Jordan Lee',
    tags: ['motivation', 'mindset', 'habits', 'consistency'],
    content: [
      { type: 'paragraph', content: 'Here\'s the truth nobody tells you: motivation is a feeling, and feelings are temporary. Every person who has built a lasting fitness habit has gone through days — sometimes weeks — where they didn\'t feel motivated at all. And they showed up anyway.' },
      { type: 'heading', content: 'Stop Relying on Motivation' },
      { type: 'paragraph', content: 'The most successful people in fitness don\'t feel motivated every day. They\'ve built systems that make working out the default, not the exception. The gym bag is packed the night before. The workout is scheduled like a meeting. The decision is already made.' },
      { type: 'tip', content: 'Lower the bar for "showing up." Tell yourself you only need to do 5 minutes. You\'ll almost always do more — but even 5 minutes maintains the habit chain.' },
      { type: 'heading', content: 'The Identity Shift That Changes Everything' },
      { type: 'paragraph', content: 'Instead of "I\'m trying to work out more," say "I\'m someone who exercises regularly." This identity-based approach, studied extensively by behavioral psychologist James Clear, rewires how you make decisions. Every workout becomes a vote for the identity you\'re building.' },
      { type: 'list', content: ['Track your workouts — seeing a streak is powerfully motivating', 'Find a workout you actually enjoy (it doesn\'t have to be hard to be effective)', 'Create a dedicated workout playlist that gets you pumped', 'Connect with others — an accountability partner changes everything', 'Celebrate small wins — every completed workout deserves recognition', 'Remove friction — lay out workout clothes the night before'] },
      { type: 'heading', content: 'What to Do When You Miss a Day' },
      { type: 'paragraph', content: 'Miss one day, it\'s an accident. Miss two days in a row, it\'s the start of a new habit. The most important rule: never miss twice. One missed workout doesn\'t derail progress. Getting back immediately after one miss is the skill that separates long-term fitness people from everyone else.' },
    ],
  },
  {
    slug: 'build-morning-workout-habit',
    title: 'How to Build a Morning Workout Habit (Even If You\'re Not a Morning Person)',
    excerpt: 'Morning workouts set the tone for the entire day and eliminate the excuses that pile up after work. Here\'s exactly how to build the habit — step by step — even if you currently hate mornings.',
    category: 'mindset',
    image: '/images/hero_workout.png',
    readTime: '7 min read',
    date: 'March 28, 2026',
    author: 'Jordan Lee',
    tags: ['morning routine', 'habits', 'mindset', 'consistency'],
    content: [
      { type: 'paragraph', content: 'Morning people aren\'t born — they\'re built. And a morning workout habit isn\'t about willpower; it\'s about engineering your environment and your night-before routine so that waking up early to exercise feels easy (or at least, easier).' },
      { type: 'heading', content: 'Why Morning Workouts Win' },
      { type: 'paragraph', content: 'Research consistently shows that people who work out in the morning are more consistent than those who exercise later in the day. Why? Because life doesn\'t interrupt mornings. Work emergencies, social plans, fatigue — they all attack your 6pm workout. They rarely touch 6am.' },
      { type: 'list', content: ['Set your alarm 30 minutes earlier (gradually, not all at once)', 'Lay your workout clothes out the night before', 'Put your alarm across the room so you must physically get up', 'Start with a 10-minute workout — lower the bar dramatically', 'Have coffee or pre-workout ready to go (automate the ritual)', 'Sleep with your blinds slightly open to use natural light as an alarm'] },
      { type: 'heading', content: 'The 21-Day Morning Challenge' },
      { type: 'paragraph', content: 'Research suggests habits take anywhere from 18 to 254 days to form, with 66 days being the average. Start with a 21-day morning workout challenge — it\'s short enough to feel achievable and long enough to begin wiring the new habit.' },
      { type: 'tip', content: 'The secret weapon: sleep. You cannot build a morning workout habit if you\'re chronically sleep-deprived. Target 7–9 hours. Go to bed 30 minutes earlier than normal when you start this habit.' },
      { type: 'heading', content: 'Your Perfect 20-Minute Morning Routine' },
      { type: 'paragraph', content: '0:00 — Wake up, drink a glass of water immediately. 0:05 — Light stretching or yoga to wake up the body. 0:10 — 10-minute bodyweight circuit (squats, push-ups, lunges, plank). 0:20 — Cool down, shower, feel incredible for the rest of the day.' },
    ],
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: Category): Post[] {
  return posts.filter((p) => p.category === category);
}

export function getFeaturedPosts(count = 3): Post[] {
  return posts.slice(0, count);
}
