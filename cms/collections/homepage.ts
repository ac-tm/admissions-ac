import { file, files } from '../utils/collections'
import { datetime, object, string, text } from '../utils/fields'

const hero = file(
  '1. Hero',
  'hero',
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

export const homepage = files('Pagina principală', 'homepage', [hero])
