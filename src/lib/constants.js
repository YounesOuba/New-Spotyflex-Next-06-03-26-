export const CATEGORIES = {
  workouts: [
    { name: 'Home Workouts', href: '/workouts/home', label: 'home-workouts' },
    { name: 'Gym Workouts', href: '/workouts/gym', label: 'gym-workouts' },
    { name: 'Beginner Friendly', href: '/workouts/beginner', label: 'beginner-workouts' },
    { name: 'Fat Burning', href: '/workouts/fat-burning', label: 'fat-burning' },
  ],
  nutrition: [
    { name: 'Meal Plans', href: '/nutrition/meal-plans', label: 'meal-plans' },
    { name: 'Healthy Recipes', href: '/nutrition/recipes', label: 'recipes' },
    { name: 'Supplements', href: '/nutrition/supplements', label: 'supplements' },
  ],
  guides: [
    { name: 'Start Here', label: 'beginner' },
    { name: 'Training Tips', label: 'training-tips' },
    { name: 'Full Guides', label: 'guides' },
  ]
};

export const BIGCATEGORIES = {
  workouts: 'Workouts',
  nutrition: 'Nutrition',
  guides: 'Guides',
};

export const LAYOUT = {
  // Maximum width for the main container
  maxWidth: 'max-w-7xl',
  // Content widths
  content: {
    article: 'max-w-[700px]', // Optimal reading width
    wide: 'max-w-[800px]',    // Wider content (headers, featured sections)
    full: 'max-w-7xl'         // Full width with padding
  },

  // Padding system
  padding: {
    mobile: 'px-4',
    tablet: 'sm:px-6',
    desktop: 'lg:px-8'
  }
};
