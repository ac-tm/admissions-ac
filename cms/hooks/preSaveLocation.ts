import { CmsEventListener } from 'netlify-cms-core'

interface Point {
  type: 'Point'
  coordinates: [number, number]
}

export const preSaveLocation: CmsEventListener = {
  name: 'preSave',
  // @ts-ignore
  handler: ({ entry }) => {
    const collection = entry.get('collection')
    if (collection !== 'locations') { return }

    const rawCoordinates: string = entry.get('data').get('coordinates')
    const point: Point = JSON.parse(rawCoordinates)

    const [lng, lat] = point.coordinates

    return entry.get('data').set('lng', lng).set('lat', lat)
  }
}
