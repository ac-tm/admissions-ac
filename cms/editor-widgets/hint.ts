import { EditorComponentOptions } from 'netlify-cms-core'
import { markdown, select } from '../utils/fields'

interface Fields {
  body: string
  color: string
}

export default {
  id: 'hint',
  label: 'Atenționare',
  fields: [
    select('Culoare de fundal', 'color', {
      options: [
        { label: 'Gri', value: 'gray' },
        { label: 'Verde', value: 'green' },
        { label: 'Roșu', value: 'red' },
        { label: 'Galben', value: 'yellow' }
      ],
      multiple: false,
      default: 'gray'
    }),
    markdown('Conținut', 'body', {
      editor_components: ['custom-link-internal',
        'custom-link-external',
        'custom-link-file'],
      buttons: ['bold', 'italic', 'code', 'link', 'heading-two']
    })
  ],
  pattern: /^<Block color="(.*)">\n\n((.|\n)*)\n\n<\/Block>$/,
  fromBlock: (match): Fields => {
    const [, color, body] = match
    return {
      body,
      color
    }
  },
  toBlock: (obj: Fields) => {
    return `<Block color="${obj.color}">\n\n${obj.body}\n\n</Block>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
