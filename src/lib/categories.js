import gym from '@/assets/Categories/gym.webp';
import home from '@/assets/Categories/home.webp';
import fat from '@/assets/Categories/fat.webp';
import beginner from '@/assets/Categories/beginner.webp';
import meals from '@/assets/Categories/meals.webp';
import recipes from '@/assets/Categories/recipes.webp';
import supplements from '@/assets/Categories/supplements.webp';
import workoutsImg from '@/assets/Categories/gym.webp'; // Reusing gym for parent workouts
import nutritionImg from '@/assets/Categories/meals.webp'; // Reusing meals for parent nutrition
import guidesImg from '@/assets/Categories/beginner.webp'; // Reusing beginner for parent guides

export const categories = [
    {
        slug: 'beginner',
        href: '/category/beginner',
        img: beginner,
        title: 'Start Here',
        desc: 'Your perfect entry point to fitness. Simple, clear, effective.',
        metaDesc: 'Start your fitness journey with our comprehensive beginner guides. Discover simple workouts, easy nutrition tips, and effective strategies for real results.',
        backendCategory: 'guides',
        filterTags: ['beginner'],
    },
    {
        slug: 'home-workouts',
        href: '/category/home-workouts',
        img: home,
        title: 'Home Workouts',
        desc: 'Train anywhere. No equipment, no excuses.',
        metaDesc: 'Transform your body from home with our equipment-free workout routines. Effective bodyweight exercises and training plans for every fitness level.',
        backendCategory: 'workouts',
        filterTags: ['home-workouts'],
    },
    {
        slug: 'gym-workouts',
        href: '/category/gym-workouts',
        img: gym,
        title: 'Gym Workouts',
        desc: 'Structured programs built for real progress.',
        metaDesc: 'Take your gym training to the next level with our structured workout plans. Expert routines for muscle building, strength gains, and fat loss.',
        backendCategory: 'workouts',
        filterTags: ['gym-workouts'],
    },
    {
        slug: 'fat-burning',
        href: '/category/fat-burning',
        img: fat,
        title: 'Fat Burning',
        desc: 'High-impact sessions designed to burn and shred.',
        metaDesc: 'Shred fat and build lean muscle with our high-intensity fat burning workouts. Discover cardio routines and HIIT sessions that deliver real results.',
        backendCategory: 'workouts',
        filterTags: ['fat-burning'],
    },
    {
        slug: 'meal-plans',
        href: '/category/meal-plans',
        img: meals,
        title: 'Meal Plans',
        desc: 'Balanced nutrition plans made simple.',
        metaDesc: 'Simplify your diet with our balanced meal plans. Personalized nutritional guidance for weight loss, muscle gain, and long-term healthy living.',
        backendCategory: 'nutrition',
        filterTags: ['meal-plans'],
    },
    {
        slug: 'recipes',
        href: '/category/recipes',
        img: recipes,
        title: 'Healthy Recipes',
        desc: "Clean, tasty meals you'll actually enjoy.",
        metaDesc: 'Fuel your body with our collection of delicious, healthy recipes. High protein, nutrient-dense meals that make eating clean both easy and enjoyable.',
        backendCategory: 'nutrition',
        filterTags: ['recipes'],
    },
    {
        slug: 'supplements',
        href: '/category/supplements',
        img: supplements,
        title: 'Supplements',
        desc: "What works, what doesn't — no marketing fluff.",
        metaDesc: 'Get the facts on fitness supplements. Honest, research-based reviews on whey protein, creatine, vitamins, and pre-workouts to help you train smarter.',
        backendCategory: 'nutrition',
        filterTags: ['supplements'],
    },
    {
        slug: 'beginner-workouts',
        href: '/category/beginner-workouts',
        img: beginner,
        title: 'Beginner Workouts',
        desc: 'Start your fitness journey with the right foundations.',
        metaDesc: 'Build a solid foundation with our beginner-friendly workout routines. Simple, safe, and effective exercises designed specifically for those starting out.',
        backendCategory: 'workouts',
        filterTags: ['beginner'],
    },
    {
        slug: 'training-tips',
        href: '/category/training-tips',
        img: beginner,
        title: 'Training Tips',
        desc: 'Practical advice to optimize your training sessions.',
        metaDesc: 'Optimize your training with expert fitness tips. Master your form, improve your recovery time, and stay motivated on your path to peak performance.',
        backendCategory: 'guides',
        filterTags: ['tips', 'training'],
    },
    // --- Parent Categories ---
    {
        slug: 'workouts',
        href: '/category/workouts',
        img: workoutsImg,
        title: 'Workouts',
        desc: 'Everything related to training, from home routines to advanced gym programs.',
        metaDesc: 'Discover our complete collection of workout routines. From home bodyweight sessions to advanced gym programs, find the perfect plan for your goals.',
        backendCategory: 'workouts',
        filterTags: [], // Show all
    },
    {
        slug: 'nutrition',
        href: '/category/nutrition',
        img: nutritionImg,
        title: 'Nutrition',
        desc: 'Fuelling your body for performance and health.',
        metaDesc: 'Master your nutrition with our comprehensive guides. Explore healthy meal plans, delicious recipes, and research-backed supplement advice.',
        backendCategory: 'nutrition',
        filterTags: [], // Show all
    },
    {
        slug: 'guides',
        href: '/category/guides',
        img: guidesImg,
        title: 'Fitness Guides',
        desc: 'In-depth articles to help you master your fitness journey.',
        metaDesc: 'In-depth fitness guides to help you achieve your health goals. Clear, actionable advice on training, nutrition, and building a sustainable lifestyle.',
        backendCategory: 'guides',
        filterTags: [], // Show all
    },
];

export function getCategoryBySlug(slug) {
    return categories.find(c => c.slug === slug);
}
