'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostCard from '@/components/PostCard.js';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock, Calendar } from 'lucide-react';
import { getAllPosts } from '@/data/blogPosts.js';
import { CATEGORIES } from '@/lib/constants';

function BlogSection() {
  const INITIAL_POSTS = 9;
  const LOAD_MORE_COUNT = 6;

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [visiblePosts, setVisiblePosts] = useState(INITIAL_POSTS);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get all available filter tags from CATEGORIES
  const allTags = [
    ...CATEGORIES.workouts.map(c => c.label),
    ...CATEGORIES.nutrition.map(c => c.label),
  ];

  useEffect(() => {
    const loadInitialPosts = async () => {
      setIsLoading(true);
      try {
        const allPosts = await getAllPosts();
        // Sort by publishedAt descending (newest first)
        const sortedPosts = [...allPosts].sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
        setVisiblePosts(INITIAL_POSTS);
        setHasMore(sortedPosts.length > INITIAL_POSTS);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialPosts();
  }, []);

  useEffect(() => {
    let filtered;

    if (selectedTag === 'all') {
      filtered = posts;
    } else {
      filtered = posts.filter(post => {
        return post.tags && post.tags.includes(selectedTag);
      });
    }

    setFilteredPosts(filtered);
    setVisiblePosts(INITIAL_POSTS);
    setHasMore(filtered.length > INITIAL_POSTS);
  }, [selectedTag, posts]);


  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#212121] via-[#1a1a1a] to-[#212121] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#cfff6a]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-40 h-40 bg-[#cfff6a]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#cfff6a]/4 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="pt-6 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#cfff6a]/10 backdrop-blur-sm border border-[#cfff6a]/20 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="h-4 w-4 text-[#cfff6a]" />
                <span className="text-sm font-medium text-[#cfff6a]">Latest Fitness Insights</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                <span className="bg-gradient-to-r from-white via-[#cfff6a] to-white bg-clip-text text-transparent">
                  Latest Fitness & Wellness Content
                </span>
              </h1>

              <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                Discover expert tips, workout routines, nutrition advice, and wellness insights
                to transform your health and achieve your fitness goals.
              </p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="py-6 border-b border-white/10 sticky top-16 z-20 bg-gradient-to-b from-[#212121] via-[#212121] to-transparent backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                  selectedTag === 'all'
                    ? 'bg-[#cfff6a] text-[#212121]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All Articles
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                    selectedTag === tag
                      ? 'bg-[#cfff6a] text-[#212121]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {tag.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center">
                <p className="text-white/70">Loading posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center">
                <p className="text-white/70 mb-4">No articles found for this category.</p>
                <Button
                  onClick={() => setSelectedTag('all')}
                  className="bg-[#cfff6a] text-[#212121] hover:bg-[#b6e85a]"
                >
                  View All Articles
                </Button>
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-16">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-white mb-2">Featured Article</h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#cfff6a] to-[#B5FF4B] rounded-full"></div>
                    </div>
                    <PostCard
                      title={featuredPost.title}
                      introtext={featuredPost.introtext}
                      fulltext={featuredPost.fulltext}
                      note={featuredPost.note}
                      publishedAt={featuredPost.publishedAt}
                      image={featuredPost.image}
                      tags={featuredPost.tags}
                      href={featuredPost.href}
                    />
                  </div>
                )}

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 && (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Latest Articles</h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#cfff6a] to-[#B5FF4B] rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                      {regularPosts.slice(0, visiblePosts - 1).map((post) => (
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

                    {/* Load More Button */}
                    {hasMore && visiblePosts < regularPosts.length && (
                      <div className="text-center">
                        <Button
                          onClick={() => setVisiblePosts((prev) => prev + LOAD_MORE_COUNT)}
                          className="bg-[#cfff6a] text-[#212121] hover:bg-[#b6e85a] px-8 py-3 text-lg"
                        >
                          Load More Articles
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
