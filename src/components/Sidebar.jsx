import { getRecentArticles } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import smallLogo from '../assets/Logo/Spoty.png';

export default async function Sidebar() {
    const recentArticles = await getRecentArticles(5);

    return (
        <aside className="lg:w-80 flex-shrink-0 space-y-8">
            {/* About Widget */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">About SpotyFlex</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                    Empowering your fitness journey with expert workouts, nutrition guides, and wellness tips.
                </p>
                <Link href="/about" className="text-[#cfff6a] text-sm font-semibold hover:text-white transition-colors">
                    Read more →
                </Link>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-6">Recent Articles</h3>
                <div className="space-y-6">
                    {recentArticles.map((article) => (
                        <Link key={article.id} href={`/article/${article.slug}`} className="flex gap-4 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                                {article.image ? (
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center p-3">
                                        <Image
                                            src={smallLogo}
                                            alt="SpotyFlex"
                                            className="opacity-10 grayscale brightness-200"
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-[#cfff6a] transition-colors line-clamp-2 mb-2">
                                    {article.title}
                                </h4>
                                <div className="flex items-center gap-1.5 text-xs text-white/50">
                                    <Clock className="w-3 h-3" />
                                    <span>{article.readTime} min read</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}
