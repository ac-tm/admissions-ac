import { EditorComponentOptions } from 'netlify-cms-core'
import { string } from '../utils/fields'

interface Fields {
  text: string
}

export default {
  id: 'document-checkbox',
  label: 'Document necesar',
  fields: [
    string('Denumire', 'text') as any
  ],
  // use <component name>
  pattern: /^<DocumentCheckbox text="(.*)"><\/DocumentCheckbox>$/,
  fromBlock: (match) => {
    return {
      text: match[1]
    }
  },
  toBlock: (obj: Fields) => {
    return `<DocumentCheckbox text="${obj.text}"></DocumentCheckbox>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
