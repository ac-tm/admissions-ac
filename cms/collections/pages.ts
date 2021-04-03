import { folder } from '../utils/collections'
import { markdown, string } from '../utils/fields'

export const pages = folder('Pagini', 'pages',
  [
    string('Titlu', 'title'),
    markdown('Conținut', 'body'),
    string('URL', 'path', { required: false, hint: 'Numele paginii folosit in URL, va fi setat automat.' })
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
