'use client';

import Link from 'next/link';
import PostCard from '@/components/PostCard.js';

export default function BeginnerMeals({ posts }) {
  const beginnerMeals = posts.filter(
    p =>
      p.primaryCategory === 'nutrition' &&
      p.tags?.includes('beginner')
  ).slice(0, 6); // Show max 6

  if (beginnerMeals.length === 0) return null;

  return (
    <div className="pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#cfff6a] mb-2">Simple Meal Plans for Beginners</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#cfff6a] to-[#B5FF4B] rounded-full"></div>
          <p className="text-white/70 mt-2">Easy-to-follow nutrition plans to fuel your fitness journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {beginnerMeals.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              introtext={post.introtext}
              fulltext={post.fulltext}
              note={post.note}
              publishedAt={post.publishedAt}
              image={post.image}
              tags={post.tags}
              href={post.href}
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/nutrition"
            className="bg-[#cfff6a] text-[#212121] hover:bg-[#B5FF4B] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            View All Beginner Meals
          </Link>
        </div>
      </div>
    </div>
  );
}
