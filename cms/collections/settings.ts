import { file, files } from '../utils/collections'
import { image, string } from '../utils/fields'

const site = file(
  'Meta',
  'site',
  [
    string('Titlu', 'title'),
    string('Descirere', 'description', { hint: 'Descriere ce va apărea pe Social Media.' }),
    image('Imagine', 'image', {
      hint: 'Imagine ce va apărea pe Social Media.'
    })
  ],
  { extension: 'json', format: 'json' }
)

export const settings = files('Configurări', 'general', [site])
