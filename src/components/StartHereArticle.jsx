'use client';

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

export default function StartHereArticle({ post }) {
  if (!post) return null;

  return (
    <div className="pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#cfff6a] mb-2">Start Here</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#cfff6a] to-[#B5FF4B] rounded-full"></div>
          <p className="text-white/70 mt-2">Your first step into the world of fitness</p>
        </div>

        <Link href={`/article/${post.href}`} className="block group">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#212121] border border-[#cfff6a]/30 hover:border-[#cfff6a]/50 transition-all duration-700 hover:shadow-2xl hover:shadow-[#cfff6a]/20 hover:-translate-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative flex items-center justify-center max-h-[400px] bg-black overflow-hidden group-hover:brightness-110 transition-all duration-700">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Categories */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  <span className="bg-[#cfff6a] text-[#212121] px-4 py-2 text-sm font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/30">
                    Start Here
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 lg:p-6 flex flex-col justify-center">
                <div className="mb-2">
                  <span className="inline-block bg-[#cfff6a]/20 text-[#cfff6a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Essential Reading
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold mb-2 leading-tight text-white group-hover:text-[#cfff6a] transition-colors duration-300">
                  {post.title}
                </h3>

                <div className="mb-4 max-h-[220px] overflow-hidden relative">
                  <p className="text-white/70 leading-relaxed text-base line-clamp-6 max-h-[8.5em] overflow-hidden">
                    {post.introtext ? (
                      (() => {
                        const match = post.introtext.match(/<p[\s\S]*?>[\s\S]*?<\/p>/i);
                        if (match) {
                          return <span dangerouslySetInnerHTML={{ __html: match[0] }} />;
                        } else {
                          const plain = post.introtext.replace(/<[^>]*>/g, '');
                          return plain.slice(0, 180) + (plain.length > 180 ? '...' : '');
                        }
                      })()
                    ) : (
                      'Welcome to your fitness journey...'
                    )}
                  </p>
                  {/* Fade out effect for overflowed text */}
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#212121] to-transparent pointer-events-none" />
                </div>

                <div className="flex items-center justify-between text-sm text-white/60">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#cfff6a]" />
                      <span>
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : 'No date'}
                      </span>
                    </div>
                    {post.note && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#cfff6a]" />
                        <span>{post.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
