import { file } from '../utils/collections'
import { bool, datetime, hidden, image, list, object, relation, select, string, text } from '../utils/fields'

const cta = [
  string('Mesaj', 'label'),
  string('Link', 'path')
]

const meta = object('Meta', 'meta', [
  string('Titlu', 'title'),
  text('Descriere', 'description', {
    pattern: ['.{0,160}', 'Trebuie să conțină între 0-160 de caractere.']
  }),
  image('Imagine', 'image', { required: false })
])

const hero = object('Hero', 'hero', [
  string('Titlu', 'title'),
  text('Subtitlu', 'copy', {
    pattern: ['.{40,160}', 'Trebuie să conțină între 40 și 160 de caractere.']
  }),
  object('Mesaj în curând', 'comingSoon', [
    bool('Afișează mesaj', 'show', { default: false }),
    string('Mesaj', 'message', { required: false, hint: 'Mesajul va înlocui butoanele din Hero.' })
  ]),
  object('Buton principal', 'cta', cta),
  object('Buton secundar', 'ctaSecondary', cta),
  object('Live update', 'notification', [
    string('Mesaj', 'label', { required: false }),
    string('Link', 'path', { required: false }),
    datetime('Afișează de la data', 'showAt', { required: false }),
    datetime('Afișează până la data', 'hideAt', { required: false })
  ], { required: false })
])

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

const sections = {
  name: 'sections',
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
} as any

const master = file('Landing page - Master', 'master', [meta, hero, sections], { format: 'json', extension: 'json' })
const bachelors = file('Landing page - Licență', 'licenta', [meta, hero, sections], { format: 'json', extension: 'json' })

export {
  master,
  bachelors
}
