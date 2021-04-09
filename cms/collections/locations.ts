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
], {
  description: `
    Locațiile din această colecție sunt utile în atașarea unei hărți. Este recomandat ca fiecare locație să conțină o scurtă descriere și alte link-uri utile pentru studenți.
    De asemenea, toate locațiile vor apărea cu un link la Google Maps.
  `
})
