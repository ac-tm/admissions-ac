import { imageBlock, richEditorBlock } from '../utils/blocks'
import { folder } from '../utils/collections'
import { hidden, string, text } from '../utils/fields'

export const pages = folder('Pagini', 'pages',
  [
    string('Titlu', 'title'),
    text('Descriere', 'description'),
    imageBlock,
    richEditorBlock,
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
    },
    description: `
      Aici se pot crea, modifica sau șterge pagini. Acestea au o structură de tip arbore, adică orice pagină poate avea la rândul ei mai multe sub-pagini (până la 100 de nivele).
      În lista centrală vor fi vizibile sub-paginile paginii selectate în meniul din stânga.
    `
  }
)
