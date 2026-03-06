'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Dumbbell, Apple, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import WorkoutTopicStrip from '@/assets/TopicStripPics/workout.webp';
import NutritionTopicStrip from '@/assets/TopicStripPics/nutrition.webp';
import GuideTopicStrip from '@/assets/TopicStripPics/guides.webp';
import { useState, useEffect } from 'react';

const TOPICS = [
    {
        id: 'workouts',
        name: 'Workouts',
        slug: 'workouts',
        icon: Dumbbell,
        image: WorkoutTopicStrip,
        description: 'Crush your goals with expert-designed training programs.',
        gradient: 'from-blue-600/20 to-transparent'
    },
    {
        id: 'nutrition',
        name: 'Nutrition',
        slug: 'nutrition',
        icon: Apple,
        image: NutritionTopicStrip,
        description: 'Fuel your success with science-backed meal plans and tips.',
        gradient: 'from-orange-600/20 to-transparent'
    },
    {
        id: 'guides',
        name: 'Guides',
        slug: 'guides',
        icon: BookOpen,
        image: GuideTopicStrip,
        description: 'Master the fundamentals of fitness and healthy living.',
        gradient: 'from-purple-600/20 to-transparent'
    }
];

export default function TopicsStrip({ articles = [] }) {
    const [hoveredId, setHoveredId] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="bg-[#0a0a0a] border-t border-white/[0.07] overflow-hidden">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[75vh] w-full">
                {TOPICS.map((topic) => {
                    const topicArticles = articles.filter(a => a.category === topic.id);

                    const count = topicArticles.length;
                    const bgImage = topicArticles[0]?.image || null;
                    const isExpanded = hoveredId === topic.id;

                    return (
                        <motion.div
                            key={topic.id}
                            onHoverStart={() => setHoveredId(topic.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            className="relative relative group overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.05] last:border-0"
                            animate={{
                                flex: isExpanded ? 2.5 : 1
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 250,
                                damping: 30,
                                mass: 0.8
                            }}
                            style={{
                                flex: 1, // Default for mobile and initial state
                            }}
                        >
                            <Link href={`/category/${topic.slug}`} className="block h-full w-full relative">
                                {/* Background Image & Overlays */}
                                <div className="absolute inset-0 z-0">
                                    {topic.image ? (
                                        <Image
                                            src={topic.image}
                                            alt={topic.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                                            priority
                                        />
                                    ) : bgImage ? (
                                        <Image
                                            src={bgImage}
                                            alt={topic.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                                        />
                                    ) : (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-40`} />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                </div>

                                {/* Content Container */}
                                <div className="relative z-20 h-full w-full p-8 lg:p-12 flex flex-col justify-end items-start min-h-[350px] lg:min-h-0">
                                    {/* Category Header */}
                                    <motion.div
                                        layout
                                        className="flex flex-col items-start gap-4 mb-2"
                                    >
                                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:bg-[#cfff6a]/10 group-hover:border-[#cfff6a]/20 transition-all duration-500">
                                            <topic.icon className="w-6 h-6 text-[#cfff6a]" />
                                        </div>

                                        <div className="flex flex-col">
                                            <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter group-hover:text-[#cfff6a] transition-colors duration-500">
                                                {topic.name}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#cfff6a]/60">
                                                    {count} Articles
                                                </span>
                                                <div className="h-px w-8 bg-[#cfff6a]/20" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {mounted && (isExpanded || isMobile) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-lg text-white/50 max-w-xs mt-4 mb-8 leading-relaxed font-medium">
                                                    {topic.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Action Button */}
                                    <div className="mt-4 flex items-center gap-4 group/btn">
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#cfff6a] group-hover:bg-[#cfff6a] transition-all duration-500 overflow-hidden">
                                            <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors duration-500" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors duration-500">
                                            Explore {topic.name}
                                        </span>
                                    </div>
                                </div>

                                {/* Accent Line - Bottom */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#cfff6a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-30" />
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
