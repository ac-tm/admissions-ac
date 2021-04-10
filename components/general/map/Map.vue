<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import { defineComponent, onMounted, PropType } from '@nuxtjs/composition-api'
import { Location } from '~/cms/types'

export default defineComponent({
  name: 'Map',
  props: {
    locations: { type: Array as PropType<(Location & IContentDocument)[]>, required: true }
  },
  setup (props) {
    const mapboxKey: string = 'pk.eyJ1IjoiYXJwYWRnYWJvciIsImEiOiJja25hdWcxcmIxNW1hMnF0YXdxdTdzcThjIn0.h5KCNvyj2sn_qIU-lm5uKw'
    const mapboxUrl: string = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

    const tiles = {
      attribution: 'Hărți de la &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> și © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'arpadgabor/cknavnn1k061m17o6id3mhd28',
      maxZoom: 20,
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapboxKey
    }

    const iconSize = {
      iconSize: [24, 24],
      iconAnchor: [16, 16],
      popupAnchor: [-4, -20]
    }

    const icons = {
      common: { iconUrl: '/icons/common.png', ...iconSize },
      crown: { iconUrl: '/icons/crown.png', ...iconSize },
      book: { iconUrl: '/icons/book.png', ...iconSize },
      building: { iconUrl: '/icons/building.png', ...iconSize },
      coffee: { iconUrl: '/icons/coffee.png', ...iconSize },
      food: { iconUrl: '/icons/food.png', ...iconSize },
      sport: { iconUrl: '/icons/sport.png', ...iconSize },
      trees: { iconUrl: '/icons/trees.png', ...iconSize },
      star: { iconUrl: '/icons/star.png', ...iconSize }
    }

    onMounted(() => {
      // eslint-disable-next-line no-use-before-define
      const L = require('leaflet')
      const icon = {
        crown: L.icon(icons.crown),
        book: L.icon(icons.book),
        building: L.icon(icons.building),
        coffee: L.icon(icons.coffee),
        food: L.icon(icons.food),
        sport: L.icon(icons.sport),
        trees: L.icon(icons.trees),
        common: L.icon(icons.common),
        star: L.icon(icons.star)
      }

      const map = new L
        .Map('map', { zoomControl: false })
        .setView([45.75418, 21.23398], 13)

      L.tileLayer(mapboxUrl, tiles).addTo(map)

      props.locations.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], {
          icon: icon[loc.icon || 'common']
        }).addTo(map)

        const generateLink = (label: string, url: string) => `<li><a href="${url}" target="_blank" class="hover:underline">${label}</a></li>`
        const googleMapsUrl = (lat: number, lng: number) => `https://www.google.com/maps/@${lat},${lng},15z`

        marker.bindPopup(/* html */`
          <div class="w-[240px] font-sans">
            <h2 class="font-bold text-lg tracking-tight leading-none text-primary">
            ${loc.title}
            </h2>

            <p class="text-gray-800 dark:text-gray-800 text-sm"> ${loc.description} </p>

            <hr class="my-4">
            <ul class="space-y-2">
              ${loc.links?.map(link => generateLink(link.label, link.url)).join('\n') || ''}
              ${generateLink('Google Maps', googleMapsUrl(loc.lat, loc.lng))}
            </ul>
          </div>
        `, { closeButton: false })
      })
    })

    return {}
  }
})
</script>

<template>
  <div id="map" class="h-[400px] w-full z-10" />
</template>

<style lang="postcss">
.leaflet-control-attribution {
  @apply opacity-50 rounded-tl-lg;
}

.leaflet-popup-content-wrapper {
  @apply rounded py-1 !important;
}
</style>
