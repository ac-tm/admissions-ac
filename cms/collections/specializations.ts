import { folder } from '../utils/collections'
import { select, string, text } from '../utils/fields'

export const specializations = folder('Specializări', 'specializations', [
  string('Denumire', 'title'),
  text('Descriere', 'description'),
  select('Culoare', 'color', {
    options: [
      { label: 'Albastru', value: 'blue' },
      { label: 'Roșu', value: 'red' },
      { label: 'Verde', value: 'green' },
      { label: 'Mov', value: 'purple' },
      { label: 'Galben', value: 'yellow' },
      { label: 'Gri', value: 'gray' }
    ],
    default: 'gray',
    multiple: false
  })
])
