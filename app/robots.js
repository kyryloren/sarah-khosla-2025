const robots = () => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/',
    },
  ],
  sitemap: 'https://www.sarahkhosla.com/sitemap.xml',
})

export default robots
