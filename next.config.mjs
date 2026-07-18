/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // If your site is hosted at username.github.io/repo-name, you also need:
  basePath: '/portfolio_akshith',
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js default image optimization
  },
};

export default nextConfig;
