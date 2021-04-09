import { folder } from '../utils/collections'
import {
  string,
  list,
  datetime,
  markdown,
  object,
  relation
} from '../utils/fields'

export const timeline = folder(
  'Calendare',
  'timelines',
  [
    string('Denumire', 'title', {
      hint: 'Folosit pentru identificare mai ușoară în panoul de administrare.'
    }),
    list(
      'Evenimente',
      'events',
      [
        string('Nume', 'title'),
        datetime('Dată început', 'date', {
          date_format: 'DD.MM.YYYY',
          time_format: 'HH:mm'
        }),
        datetime('Termen limită', 'deadline', {
          required: false,
          date_format: 'DD.MM.YYYY',
          time_format: 'HH:mm',
          hint:
            'Opțional. Un exemplu de evniment fără termen limită este publicarea rezultatelor.'
        }),
        markdown('Detalii', 'details', {
          buttons: ['bold', 'italic', 'link'],
          editor_components: []
        }),
        object(
          'Acțiune',
          'cta',
          [
            string('Mesaj', 'label'),
            relation('Pagină', 'path', {
              collection: 'pages',
              value_field: 'fullPath',
              search_fields: ['title'],
              display_fields: ['title'],
              multiple: false
            })
          ],
          { required: false }
        )
      ],
      { label_singular: 'eveniment' }
    )
  ],
  { format: 'json', extension: 'json' }
)
