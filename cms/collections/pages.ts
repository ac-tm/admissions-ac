import { imageBlock } from '../utils/blocks'
import { folder } from '../utils/collections'
import { hidden, markdown, string, text } from '../utils/fields'

export const pages = folder('Pagini', 'pages',
  [
    string('Titlu', 'title'),
    text('Descriere', 'description'),
    imageBlock,
    markdown('Conținut', 'body'),
    hidden('Full Path', 'fullPath', { required: true })
  ],
  {
    label_singular: 'Pagină',
    summary: '{{title}}',
    preview_path: '{{fullPath}}',

    nested: { depth: 100 },
    meta: {
      path: {
        widget: 'parent',
        index_file: 'index',
        label: 'Părinte'
      }
    }
  }
)
