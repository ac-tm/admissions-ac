import { EditorComponentOptions } from 'netlify-cms-core'
import { relation, string } from '../utils/fields'

interface Fields {
  label: string
  path: string
}

export default {
  id: 'custom-link-internal',
  label: 'Link intern',
  fields: [
    string('Mesaj', 'label') as any,
    relation('Pagină', 'path', {
      collection: 'pages',
      value_field: 'fullPath',
      search_fields: ['fullPath', 'title'],
      display_fields: ['title'],
      multiple: false
    })
  ],
  pattern: /^<Attachment label="(.*)" internal="(.*)"><\/Attachment>$/,
  fromBlock: (match) => {
    const [, label, path] = match
    return {
      path,
      label
    }
  },
  toBlock: (obj: Fields) => {
    return `<Attachment label="${obj.label}" internal="${obj.path}"></Attachment>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
