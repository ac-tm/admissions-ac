import { EditorComponentOptions } from 'netlify-cms-core'
import { image, string } from '../utils/fields'

interface Fields {
  src: string
  alt: string
  caption: string
}

export default {
  id: 'figure',
  label: 'Image',
  fields: [
    image('Image', 'src') as any,
    string('Alt text', 'alt') as any,
    string('Caption', 'caption', { required: false }) as any
  ],
  // use <component name>
  pattern: /^<Fig src="(.*)" alt="(.*)" caption="(.*)"><\/Fig>$/,
  fromBlock: (match) => {
    return {
      src: match[1],
      alt: match[2],
      caption: match[3]
    }
  },
  toBlock: (obj: Fields) => {
    return `<Fig src="${obj.src}" alt="${obj.alt}" caption="${obj.caption}"></Fig>`
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
