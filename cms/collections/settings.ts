import { file, files } from '../utils/collections'
import { image, string, list, object } from '../utils/fields'
import { bachelors, master } from './homepage'

const site = file(
  'General',
  'site',
  [
    string('Titlu', 'title'),
    string('Descirere', 'description', { hint: 'Descriere ce va apărea pe Social Media.' }),
    image('Imagine', 'image', {
      hint: 'Imagine ce va apărea pe Social Media.'
    }),
    object('Link licență', 'licenta', [
      string('Titlu', 'title'),
      string('Descriere', 'description'),
      image('Imagine', 'image'),
      string('Buton', 'button'),
      string('Link', 'link')
    ]),
    object('Link master', 'master', [
      string('Titlu', 'title'),
      string('Descriere', 'description'),
      image('Imagine', 'image'),
      string('Buton', 'button'),
      string('Link', 'link')

    ]),
    object('Buton', 'cta', [
      string('Mesaj', 'label'),
      string('URL', 'path')
    ])
  ],
  { extension: 'json', format: 'json' }
)

const partners = file(
  'Parteneri',
  'partners',
  [
    list('Logo-uri', 'logos', [
      string('Denumire', 'name'),
      image('Imagine', 'image')
    ])
  ],
  { extension: 'json', format: 'json' }
)

const footer = file(
  'Footer',
  'footer',
  [
    {
      widget: 'list',
      name: 'addressLines',
      label: 'Contact',
      field: string('Linie', 'line')
    } as any,

    object('Link-uri Social Media', 'social', [
      string('Website', 'website'),
      string('Instagram', 'instagram', { required: false }),
      string('Facebook', 'facebook', { required: false }),
      string('Twitter', 'twitter', { required: false })
    ]),

    list('Alte link-uri', 'links', [
      string('Denumire', 'label'),
      string('URL', 'path')
    ])
  ],
  { extension: 'json', format: 'json' }
)

export const settings = files('Configurări', 'general', [bachelors, master, partners, site, footer])
