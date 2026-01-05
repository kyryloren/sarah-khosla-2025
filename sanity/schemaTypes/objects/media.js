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
          { title: 'Video (File Upload)', value: 'video' },
          { title: 'Video (Mux)', value: 'muxVideo' },
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
    defineField({
      name: 'muxVideo',
      title: 'Mux Video',
      type: 'mux.video',
      description: 'Upload a video to Mux for optimized streaming',
      hidden: ({ parent }) => parent?.mediaType !== 'muxVideo',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { parent } = context
          if (parent?.mediaType === 'muxVideo' && !value) {
            return 'Mux video is required when media type is set to Mux video'
          }
          return true
        }),
    }),
    defineField({
      name: 'keepAudio',
      title: 'Keep Video Audio',
      description: 'Enable audio playback for this video',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) =>
        parent?.mediaType !== 'video' && parent?.mediaType !== 'muxVideo',
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      image: 'image',
      video: 'video',
      muxVideo: 'muxVideo',
      alt: 'image.alt',
    },
    prepare({ mediaType, image, video, muxVideo, alt }) {
      let media
      if (mediaType === 'image') {
        media = image
      } else if (mediaType === 'video') {
        media = video
      } else if (mediaType === 'muxVideo') {
        media = muxVideo?.asset?.thumbTime
          ? { _type: 'image', asset: { _ref: muxVideo.asset.thumbTime } }
          : undefined
      }

      return {
        title:
          mediaType === 'image'
            ? 'Image'
            : mediaType === 'muxVideo'
              ? 'Mux Video'
              : 'Video',
        subtitle: alt || 'No alt text provided',
        media: mediaType === 'image' ? image : undefined,
      }
    },
  },
})
