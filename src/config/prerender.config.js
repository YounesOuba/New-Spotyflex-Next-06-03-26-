/**
 * Pre-rendering Configuration for Static SEO
 * Generates static HTML for critical routes at build time
 * Ensures meta tags and JSON-LD are visible to search engines immediately
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Routes to pre-render with their metadata
 * Add more important routes here as needed
 */
export const PRERENDER_ROUTES = [
  '/',
  '/articles',
  '/begin',
  '/workouts',
  '/about',
  '/contact',
];

/**
 * Category routes to pre-render
 * These will be dynamically added
 */
export const PRERENDER_CATEGORY_ROUTES = [
  '/category/workouts',
  '/category/nutrition',
  '/category/guides',
];

/**
 * Article routes to pre-render (top articles)
 * Update this list with your most important article slugs
 */
export const PRERENDER_ARTICLE_ROUTES = [
  '/article/mastering-stronglifts-5x5-2025-guide',
  '/article/cardio-vs-hiit-fat-loss',
  '/article/top-10-healthy-foods-for-fitness',
  '/article/sick-of-protein-powder-problems',
  '/article/top-7-supplements-to-boost-fitness',
  '/article/20-minute-full-body-home-workout',
  '/article/5-simple-exercises-build-strong-foundation',
  '/article/ultimate-gym-workout-guide',
  '/article/7-best-home-workouts-for-beginners',
  '/article/10-proven-fat-burning-tips',
];

/**
 * Get all routes to pre-render
 */
export function getAllPreRenderRoutes() {
  return [
    ...PRERENDER_ROUTES,
    ...PRERENDER_CATEGORY_ROUTES,
    ...PRERENDER_ARTICLE_ROUTES,
  ];
}

/**
 * Vite plugin for pre-rendering during build
 * This generates static HTML files for critical routes
 */
export function preRenderPlugin() {
  return {
    name: 'vite-plugin-prerender',
    apply: 'build',
    async generateBundle() {
      // This will be handled by the build script
      // We generate a route list that Puppeteer/jsdom can use
      const routesFile = path.resolve(__dirname, 'dist', 'prerender-routes.json');
      
      // Ensure dist directory exists
      const distDir = path.dirname(routesFile);
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
      }

      // Write routes to file for the pre-render script
      fs.writeFileSync(
        routesFile,
        JSON.stringify({
          routes: getAllPreRenderRoutes(),
          generated: new Date().toISOString(),
        }, null, 2)
      );
    },
  };
}
