import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: () => '🏠',
  options: { singleton: true },
  fields: [
    defineField({
      name: 'heroMedia',
      title: 'Hero Media',
      description: 'Optional hero image or video for the homepage',
      type: 'media',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home',
        subtitle: 'Featured projects configuration',
      }
    },
  },
})
