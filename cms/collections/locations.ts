import { folder } from '../utils/collections'
import { map, string, text, list, select } from '../utils/fields'

export const locations = folder('Locații', 'locations', [
  string('Denumire', 'title'),
  text('Descriere', 'description'),
  select('Iconiță', 'icon', {
    options: [
      { label: '⚪ Cerc (implicit)', value: 'common' },
      { label: '⭐ Stea', value: 'star' },
      { label: '📖 Carte', value: 'book' },
      { label: '🏦 Clădire', value: 'building' },
      { label: '☕ Cafea', value: 'coffee' },
      { label: '🥣 Mâncare', value: 'food' },
      { label: '🥎 Sport', value: 'sport' },
      { label: '🌲 Copaci', value: 'trees' },
      { label: '👑 Coroană', value: 'crown' }
    ],
    default: 'common',
    multiple: false
  }),
  map('Locație', 'coordinates'),
  list('Link-uri', 'links', [
    string('Denumire', 'label'),
    string('URL', 'url')
  ])
], {
  format: 'json',
  extension: 'json',
  description: `
    Locațiile din această colecție sunt utile în atașarea unei hărți. Este recomandat ca fiecare locație să conțină o scurtă descriere și alte link-uri utile pentru studenți.
    De asemenea, toate locațiile vor apărea cu un link la Google Maps.
  `
})
