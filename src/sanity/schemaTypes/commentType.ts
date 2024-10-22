import {CommentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import requiredValue from '../lib/requiredValue'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      ...requiredValue
    }),
    defineField({
      name: 'commented_at',
      type: 'date',
      ...requiredValue
    }),
    defineField({
      name: 'message',
      type: 'text',
      ...requiredValue
    }),
  ],
})
