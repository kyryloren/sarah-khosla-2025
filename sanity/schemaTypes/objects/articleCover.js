import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articleCover',
  title: 'Article Cover',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
      description: 'Upload an image or video for the article cover',
      type: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'border',
      title: 'Border',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
  ],
})
