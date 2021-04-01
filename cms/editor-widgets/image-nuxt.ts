import { EditorComponentField, EditorComponentOptions } from 'netlify-cms-core'
import { image, string, select } from '../utils/fields'

interface Fields {
  src: string
  alt: string
  caption: string
  float: 'none' | 'left' | 'right'
}

export default {
  id: 'image-nuxt',
  label: 'Image',
  fields: [
    image('Image', 'src') as EditorComponentField,
    string('Alt text', 'alt') as EditorComponentField,
    string('Caption', 'caption', { required: false }) as EditorComponentField
  ],
  // use <component name>
  pattern: /^<Fig src="(.*)" alt="(.*)" caption="(.*)" float="(.*)"><\/Fig>$/,
  fromBlock: (match) => {
    return {
      src: match[1],
      alt: match[2],
      caption: match[3],
      float: match[4]
    }
  },
  toBlock: (obj: Fields) => {
    return `<Fig src="${obj.src}" alt="${obj.alt}" caption="${obj.caption}" float="${obj.float}"></Fig>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
