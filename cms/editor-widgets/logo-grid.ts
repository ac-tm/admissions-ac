import { EditorComponentOptions } from 'netlify-cms-core'
import { image, list, string } from '../utils/fields'

interface Fields {
  images: string
}

export default {
  id: 'logo-grid',
  label: 'Grid sigle',
  fields: [
    list('Imagini', 'images', [
      string('Denumire', 'name'),
      image('Imagine', 'image')
    ])
  ],
  // use <component name>
  pattern: /^<LogoGrid items="(.*)"><\/LogoGrid>$/,
  fromBlock: (match) => {
    if (!match[1]) { return [] }
    return {
      images: JSON.parse(match[1].replaceAll('|', '"'))
    }
  },
  toBlock: (obj: Fields) => {
    if (!obj.images) { return [] }
    return `<LogoGrid items="${JSON.stringify(obj.images).replaceAll('"', '|')}"></LogoGrid>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
