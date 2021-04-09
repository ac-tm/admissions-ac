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
          editor_components: [
            'custom-link-internal',
            'custom-link-external',
            'custom-link-file'
          ],
          required: false
        })
      ],
      { label_singular: 'eveniment' }
    )
  ],
  {
    format: 'json',
    extension: 'json',
    description: `
    Calendarele de aici se pot atașa în orice pagină, de exemplu pentru calednarul de înscrieri sau cursurile de matematică.
  `
  }
)
