import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { blockContentType } from './blockContentType';
import requiredValue from '../lib/requiredValue';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      ...requiredValue
    }),
    defineField({
      name: 'href',
      type: 'slug',
      title: "href",
      options: {
        source: 'title',
      },
      ...requiredValue
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ],
      ...requiredValue
    }),
    defineField({
      name: 'bannerImage',
      type: 'image',
      title: "Banner Image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ],
      ...requiredValue
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: "Description",
      rows: 5,
      ...requiredValue
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
      ...requiredValue
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
      ...requiredValue
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      ...requiredValue
    }),
    defineField({
      name: 'baseViews',
      type: 'number',
      title: 'Base Views',
      ...requiredValue
    }),
    defineField({
      name: 'actualViews',
      type: 'number',
      title: 'Actual Views',
      // readOnly: true,
      initialValue: 0,
      ...requiredValue,
    }),
    defineField({
      name: 'comments',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'comment' } })],
      ...requiredValue
    }),
    defineField({
      name: 'rating',
      type: 'number',
      validation: (rule) => rule.max(5).min(0).precision(1).custom((count) => {
        return count ? (count % 0.5) === 0 ? true as const : "The rating myst be at increments of 0.5" : true;
      })
    }),
    blockContentType,
    defineField({
      name: "timeTakenToRead",
      type: "string",
      title: "Time taken to Read",
      description: "Time taken to read the post in minutes",
      ...requiredValue
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
