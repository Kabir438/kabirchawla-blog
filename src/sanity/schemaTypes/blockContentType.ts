import { defineField } from 'sanity';
import { YoutubeEmbed } from '../components/youtube';
import requiredValue from '../lib/requiredValue';

export const blockContentType = defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    { type: 'block' },
    {
      type: 'image', 
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
        {
          name: "glow",
          type: "boolean",
          title: "Enable Glow Effect"
        }
      ],
    },
    {
      type: 'code',
      options: {
        withFilename: true,
      }
    },
    // { type: 'link' },
    { type: 'mux.video' },
    // { type: 'svgIcon' },
    // { type: 'quote' },
    // { type: 'list' }, // For bullet/numbered lists
    { type: 'table' }, // If you want to include tables
    // { type: 'embed' }, // For embedding content
    {
      name: 'youtubeVideo',
      title: 'YouTube Video',
      type: 'object',
      // icon: ,
      fields: [
        defineField({
          name: 'video',
          title: 'YouTube Video ID',
          type: 'string',
          description: 'The youtube video URL',
        }),
        defineField({
          name: 'controls',
          title: 'Controls',
          type: 'boolean',
        }),
        defineField({
          name: 'autoplay',
          title: 'Autoplay',
          type: 'boolean',
        }),
      ],
      components: {
        preview: YoutubeEmbed
      },
    }
  ],
  ...requiredValue
});