import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  icon: () => '📷',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      description: 'Choose whether to upload an image or video',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and SEO',
          validation: (Rule) =>
            Rule.required().error('Alt text is required for accessibility'),
        }),
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { parent } = context
          if (parent?.mediaType === 'image' && !value) {
            return 'Image is required when media type is set to image'
          }
          return true
        }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the video for accessibility and SEO',
          validation: (Rule) =>
            Rule.required().error('Alt text is required for accessibility'),
        }),
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { parent } = context
          if (parent?.mediaType === 'video' && !value) {
            return 'Video is required when media type is set to video'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      image: 'image',
      video: 'video',
      alt: 'image.alt',
    },
    prepare({ mediaType, image, video, alt }) {
      const media = mediaType === 'image' ? image : video
      return {
        title: mediaType === 'image' ? 'Image' : 'Video',
        subtitle: alt || 'No alt text provided',
        media: mediaType === 'image' ? image : undefined,
      }
    },
  },
})
