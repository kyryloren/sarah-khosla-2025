const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
    images: {
      remotePatterns: [
        {
          protocol: process.env.PROTOCOL,
          hostname: process.env.STRAPI_MEDIA,
        },
      ],
      dangerouslyAllowSVG: true,
    },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css',
          },
        ],
      },
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
