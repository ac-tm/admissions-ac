import { file, files } from '../utils/collections'
import { datetime, hidden, list, object, relation, select, string, text } from '../utils/fields'

const cta = [
  string('Mesaj', 'label'),
  string('Link', 'path')
]

const hero = file(
  'Hero',
  'hero',
  [
    string('Titlu', 'title'),
    text('Subtitlu', 'copy', {
      pattern: ['.{120,160}', 'Trebuie să conțină între 120-160 de caractere.']
    }),
    object('Buton principal', 'cta', cta),
    object('Buton secundar', 'ctaSecondary', cta),
    object('Notificare', 'notification', [
      string('Mesaj', 'label', { required: false }),
      string('Link', 'path', { required: false }),
      datetime('Afișează de la data', 'showAt', { required: false }),
      datetime('Afișează până la data', 'hideAt', { required: false })
    ], { required: false })
  ],
  { extension: 'json', format: 'json' }
)

const sectionSpecializations = [
  string('Titlu', 'title'),
  string('Descriere', 'description'),
  object('Buton', 'cta', cta),
  list('Specializări', 'items', [
    relation('Specializare', 'specialization', {
      value_field: '{{slug}}',
      search_fields: ['title'],
      display_fields: ['title'],
      collection: 'specializations'
    }),
    select('Dimensiune', 'width', {
      options: [
        { label: 'Full', value: 'full' },
        { label: 'Jumătate', value: 'half' }
      ],
      multiple: false,
      default: 'full'
    })
  ])
]

const mapSection = [
  string('Titlu', 'title'),
  string('Descriere', 'description'),
  object('Buton', 'cta', cta)
]

const sectionPages = [
  list('Pagini', 'list', relation('Pagină', 'page', {
    value_field: 'fullPath',
    collection: 'pages',
    search_fields: ['title'],
    display_fields: ['{{title}}']
  }), { summary: '{{page}}' })
]

const sections = file('Secțiuni', 'sections', [
  {
    name: 'items',
    label: 'Secțiuni',
    widget: 'list',
    label_singular: 'secțiune',
    types: [
      object('Specializări', 'specializations', sectionSpecializations) as any,
      object('Grup de pagini', 'pages', sectionPages) as any,
      object('Testimoniale', 'testimonials', [hidden('Hidden', 'hidden', { default: '-' })], {
        summary: 'Testimoniale - Modificările sunt făcute din pagina dedicată acestora în meniu.'
      }) as any,
      object('Hartă', 'locations', mapSection) as any
    ]
  }
], { extension: 'json', format: 'json' })

export const homepage = files('Pagina principală', 'homepage', [hero, sections], {
  description: `
    Aici se poat modifica texte de pe pagina principală, dar și cum sunt poziționate elementele.
    Secțiunea „Hero” este prima secțiune de pe pagină care se vede de utilizator când intră pe website.
    Fiecare secțiune din „Secțiuni” este configurabilă. De asemenea se pot adăuga și reorganiza acestea.
  `
})
