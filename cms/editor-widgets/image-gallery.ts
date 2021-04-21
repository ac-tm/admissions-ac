import { EditorComponentOptions } from 'netlify-cms-core'
import { image, list, string } from '../utils/fields'

interface Fields {
  images: string
}

export default {
  id: 'image-gallery',
  label: 'Galerie de imagini',
  fields: [
    list('Imagini', 'images', [
      string('Descriere', 'alt'),
      image('Imagine', 'src')
    ])
  ],
  // use <component name>
  pattern: /^<ImageGallery items="(.*)"><\/ImageGallery>$/,
  fromBlock: (match) => {
    if (!match[1]) { return [] }
    return {
      images: JSON.parse(match[1].replace(/\|/g, '"'))
    }
  },
  toBlock: (obj: Fields) => {
    if (!obj.images) { return [] }
    return `<ImageGallery items="${JSON.stringify(obj.images).replace(/"/g, '|')}"></ImageGallery>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
