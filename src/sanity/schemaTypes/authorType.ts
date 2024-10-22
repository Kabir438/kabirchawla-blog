import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import requiredValue from '../lib/requiredValue'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      ...requiredValue
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      ...requiredValue
    }),
    defineField({
      name: 'caption',
      type: 'string',
      ...requiredValue
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      ...requiredValue
    }),
    defineField({
      name: 'bio',
      type: 'text',
      ...requiredValue
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
