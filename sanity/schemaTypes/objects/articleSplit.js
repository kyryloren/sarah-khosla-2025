import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articleSplit',
  title: 'Article Split',
  type: 'object',
  fields: [
    defineField({
      name: 'left_media',
      title: 'Left media',
      description: 'Upload an image or video for the left side',
      type: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'right_media',
      title: 'Right media',
      description: 'Upload an image or video for the right side',
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
