import { EditorComponentOptions } from 'netlify-cms-core'
import { hidden } from '../utils/fields'

export default {
  id: 'logo-grid',
  label: 'Grid sigle',
  fields: [
    hidden('Show', 'show')
  ],
  pattern: /^<LogoGrid><\/LogoGrid>$/,
  fromBlock: () => {
    return {
      show: '1'
    }
  },
  toBlock: () => {
    return '<LogoGrid></LogoGrid>'
  },
  toPreview: () => {
    return ''
  }
} as EditorComponentOptions
