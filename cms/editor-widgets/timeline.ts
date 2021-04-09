import { EditorComponentOptions } from 'netlify-cms-core'
import { relation } from '../utils/fields'

interface Fields {
  slug: string
}

export default {
  id: 'timeline',
  label: 'Calendar',
  fields: [
    relation('Alege calendarul', 'slug', {
      collection: 'timelines',
      value_field: '{{slug}}',
      search_fields: ['{{slug}}', 'title'],
      display_fields: ['title'],
      required: true,
      multiple: false,
      hint: 'Calendarul nu va putea fi modificat direct aici.'
    })
  ],
  // use <component name>
  pattern: /^<Timeline slug="(.*)"><\/Timeline>$/,
  fromBlock: (match) => {
    const [, slug] = match
    return {
      slug
    }
  },
  toBlock: (obj: Fields) => {
    return `<Timeline slug="${obj.slug}"></Timeline>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
