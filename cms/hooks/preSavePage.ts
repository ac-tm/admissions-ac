import { CmsEventListener } from 'netlify-cms-core'

export const preSavePage: CmsEventListener = {
  name: 'preSave',
  // @ts-ignore
  handler: ({ entry }) => {
    const collection = entry.get('collection')
    if (collection !== 'pages') { return }

    const currentPath: string = entry.get('data').get('path')
    const metaPath: string = entry.get('meta').get('path')

    const path = currentPath || metaPath

    return entry.get('data').set('fullPath', path)
  }
}
