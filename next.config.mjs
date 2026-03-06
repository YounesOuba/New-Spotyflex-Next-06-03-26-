/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'cms.spotyflex.com', pathname: '/**' }],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
}
export default nextConfig