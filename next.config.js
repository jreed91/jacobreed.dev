/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Old non-kebab-case post slugs, kept alive for links already in the wild.
      {
        source: '/blog/CDK',
        destination: '/blog/cdk-lambda-canary',
        permanent: true
      },
      {
        source: '/blog/Explain',
        destination: '/blog/postgres-query-plans',
        permanent: true
      }
    ];
  },
  async rewrites() {
    return [
      // The Stride landing page is a standalone page in the app's own
      // branding, outside the site layout. /stride/privacy and /stride/support
      // stay App Router pages.
      {
        source: '/stride',
        destination: '/stride/index.html'
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  }
};
