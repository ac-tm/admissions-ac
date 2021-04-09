import { EditorComponentOptions } from 'netlify-cms-core'
import { string, file } from '../utils/fields'

interface Fields {
  label: string
  path: string
}

export default {
  id: 'custom-link-file',
  label: 'Link fișier',
  fields: [
    string('Denumire', 'label') as any,
    file('URL', 'path', { hint: 'Adaugă un link sau încarcă un fișier.' }) as any
  ],
  pattern: /^<Attachment label="(.*)" file="(.*)"><\/Attachment>$/,
  fromBlock: (match) => {
    const [, label, path] = match
    return {
      path,
      label
    }
  },
  toBlock: (obj: Fields) => {
    return `<Attachment label="${obj.label}" file="${obj.path}"></Attachment>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
