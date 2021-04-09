import { EditorComponentOptions } from 'netlify-cms-core'
import { string } from '../utils/fields'

interface Fields {
  label: string
  path: string
}

export default {
  id: 'custom-link-external',
  label: 'Link extern',
  fields: [
    string('Nume', 'label') as any,
    string('URL', 'path') as any
  ],
  pattern: /^<Attachment label="(.*)" external="(.*)"><\/Attachment>$/,
  fromBlock: (match) => {
    const [, label, path] = match
    return {
      path,
      label
    }
  },
  toBlock: (obj: Fields) => {
    return `<Attachment label="${obj.label}" external="${obj.path}"></Attachment>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
