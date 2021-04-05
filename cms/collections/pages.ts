import { folder } from '../utils/collections'
import { markdown, string } from '../utils/fields'

export const pages = folder('Pagini', 'pages',
  [
    string('Titlu', 'title'),
    markdown('Conținut', 'body')
  ],
  {
    label_singular: 'Pagină',
    summary: '{{title}}',

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
