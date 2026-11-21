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
      },
      // The Stride website moved to runwithstride.app (deployed from the
      // running-app repo). /stride/privacy and /stride/support stay here,
      // because App Store Connect links to them.
      {
        source: '/stride',
        destination: 'https://runwithstride.app/',
        permanent: true
      },
      {
        source: '/stride/race',
        destination: 'https://runwithstride.app/race',
        permanent: true
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
