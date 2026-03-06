'use client';

import Link from 'next/link';
import { Grid3X3 } from 'lucide-react';
import Image from 'next/image';

import { categories } from '@/lib/categories';
import { useRouter } from 'next/navigation';

const categoryGroups = [
  {
    title: 'Start Your Journey',
    subtitle: 'New to fitness? Begin here.',
    items: categories.filter(c => c.label === 'beginner'),
    gridCols: 'grid-cols-1'
  },
  {
    title: 'Workout Programs',
    subtitle: 'Choose how you want to train',
    items: categories.filter(c =>
      ['home-workouts', 'gym-workouts', 'fat-burning'].includes(c.label)
    ),
    gridCols: 'grid-cols-1 sm:grid-cols-3'
  },
  {
    title: 'Nutrition & Wellness',
    subtitle: 'Fuel your body the right way',
    items: categories.filter(c =>
      ['meal-plans', 'recipes', 'supplements'].includes(c.label)
    ),
    gridCols: 'grid-cols-1 sm:grid-cols-3'
  }
];

const CategoryCard = ({
  category,
  onClick
}) => {
  const isBeginner = category.label === 'beginner';

  return (
    <button
      onClick={onClick}
      className="group relative w-full h-full text-left focus:outline-none"
      title={category.title}
    >
      <div
        className="relative h-full rounded-2xl border border-white/10 
        bg-gradient-to-br from-[#161616] via-[#1e1e1e] to-[#141414]
        overflow-hidden transition-all duration-500
        hover:border-[#cfff6a]/50 hover:shadow-2xl hover:shadow-[#cfff6a]/20
        hover:-translate-y-1"
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          transition duration-500 bg-gradient-to-r from-transparent via-[#cfff6a]/10 to-transparent"
        />

        <div
          className={`relative z-10 p-6 flex h-full gap-8 ${isBeginner ? 'flex-col sm:flex-row' : 'flex-col'}`}>
          {/* Image */}
          <div
            className={`flex items-center justify-center ${isBeginner ? 'w-full sm:w-48 mb-6 sm:mb-0' : 'flex-grow mb-6'}`}>
            <div className={`${isBeginner ? 'w-48 h-48' : 'w-40 h-40'} rounded-lg overflow-hidden bg-black/20 relative`}>
              <Image
                src={category.img}
                alt={category.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[1deg]"
              />
            </div>
          </div>

          {/* Text */}
          <div className={isBeginner ? 'flex flex-col justify-center flex-grow' : ''}>
            <h3 className="text-xl font-extrabold text-white mb-2 transition group-hover:text-[#cfff6a]">
              {category.title}
            </h3>

            <p className="text-sm text-white/60 group-hover:text-white/80 transition">
              {category.desc}
            </p>

            <span
              className="inline-block mt-4 text-xs font-bold uppercase tracking-wide
              text-[#cfff6a]/70 group-hover:text-[#cfff6a] transition"
            >
              Explore →
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

function CategorySection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#212121] via-[#1a1a1a] to-[#212121] text-white overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#cfff6a]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-40 h-40 bg-[#cfff6a]/5 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#cfff6a]/10 border border-[#cfff6a]/20 rounded-full px-5 py-2 mb-6">
              <Grid3X3 className="w-4 h-4 text-[#cfff6a]" />
              <span className="text-sm font-semibold text-[#cfff6a]">
                SpotyFlex Categories
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
              <span className="bg-gradient-to-r from-white via-[#cfff6a] to-white bg-clip-text text-transparent">
                Choose Your Transformation
              </span>
            </h2>

            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Train smarter. Eat better. Move with purpose.
              SpotyFlex gives you clarity, not confusion.
            </p>
          </div>

          {/* Category Groups */}
          <div className="space-y-20">
            {categoryGroups.map((group) => (
              <div key={group.title}>
                {/* Group Header */}
                <div className="text-center mb-12">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{group.title}</h3>
                  <p className="text-white/60 text-sm sm:text-base">{group.subtitle}</p>
                </div>

                {/* Group Grid */}
                <div className={`grid ${group.gridCols} gap-6 lg:gap-8`}>
                  {group.items.map((category) => (
                    <CategoryCard
                      key={category.label}
                      category={category}
                      onClick={() => router.push(category.href)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
