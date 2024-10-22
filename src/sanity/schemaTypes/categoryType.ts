import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import requiredValue from '../lib/requiredValue'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      ...requiredValue
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      ...requiredValue
    }),
    defineField({
      name: 'description',
      type: 'text',
      ...requiredValue
    }),
  ],
})
