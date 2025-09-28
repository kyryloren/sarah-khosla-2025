import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  preview: {
    select: {
      title: 'About',
    },
    prepare() {
      return {
        title: 'About',
        subtitle: 'About page content',
      }
    },
  },
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [{ type: 'listItem' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
