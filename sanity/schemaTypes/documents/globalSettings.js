import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'globalSettings',
  title: 'Global',
  type: 'document',
  icon: () => '⚙️',
  options: { singleton: true },
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for SEO purposes',
    }),
    defineField({
      name: 'shareImage',
      title: 'Share Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) =>
            Rule.required().error('Alt text is required for accessibility'),
        }),
      ],
      description: 'Default image for social media sharing',
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'socials',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
