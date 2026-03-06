'use client';

import Link from 'next/link';
import PostCard from '@/components/PostCard.js';

export default function BeginnerWorkouts({ posts }) {
  const beginnerWorkouts = posts.filter(
    p =>
      p.primaryCategory === 'workouts' &&
      p.tags?.includes('beginner')
  ).slice(0, 6); // Show max 6

  if (beginnerWorkouts.length === 0) return null;

  return (
    <div className="pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#cfff6a] mb-2">Beginner Workouts</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#cfff6a] to-[#B5FF4B] rounded-full"></div>
          <p className="text-white/70 mt-2">Simple, effective workouts to build your foundation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {beginnerWorkouts.map((post) => (
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
            href="/workouts"
            className="bg-[#cfff6a] text-[#212121] hover:bg-[#B5FF4B] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            View All Beginner Workouts
          </Link>
        </div>
      </div>
    </div>
  );
}
