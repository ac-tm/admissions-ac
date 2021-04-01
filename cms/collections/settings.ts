import { file, files } from '../utils/collections'
import { image, string, datetime, object, text } from '../utils/fields'

const home = file(
  'Pagina principală',
  'home',
  [
    string('Titlu', 'title'),
    text('Subtitlu', 'copy', {
      pattern: ['.{120,160}', 'Trebuie să conțină între 120-160 de caractere.']
    }),
    object('Buton principal', 'cta', [
      string('Mesaj', 'label'),
      string('Link', 'path')
    ]),
    object('Buton secundar', 'ctaSecondary', [
      string('Mesaj', 'label'),
      string('Link', 'path')
    ]),
    object('Notificare', 'notification', [
      string('Mesaj', 'label', { required: false }),
      string('Link', 'path', { required: false }),
      datetime('Afișează de la data', 'showAt', { required: false }),
      datetime('Afișează până la data', 'hideAt', { required: false })
    ], { required: false })
  ],
  { extension: 'json', format: 'json' }
)

const site = file(
  'General',
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

export const settings = files('General', 'general', [site, home])
