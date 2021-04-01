import { folder } from '../utils/collections'
import { string } from '../utils/fields'

export const pages = folder('Pages', 'pages',
  [string('Title', 'title')],
  {
    nested: { depth: 100 },
    meta: {
      path: {
        widget: 'string',
        label: 'Path',
        index_file: 'index'
      }
    }
  }
)
