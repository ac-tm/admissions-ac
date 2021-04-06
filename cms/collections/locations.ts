import { folder } from '../utils/collections'
import { map, string, text, list } from '../utils/fields'

export const locations = folder('Locații', 'locations', [
  string('Denumire', 'title'),
  text('Descriere', 'description'),
  map('Locație', 'coordinates'),
  list('Link-uri', 'links', [
    string('Denumire', 'label'),
    string('URL', 'url')
  ])
])
