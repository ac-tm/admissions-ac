<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Map',
  props: {},
  setup () {
    const mapboxKey: string = 'pk.eyJ1IjoiYXJwYWRnYWJvciIsImEiOiJja25hdWcxcmIxNW1hMnF0YXdxdTdzcThjIn0.h5KCNvyj2sn_qIU-lm5uKw'
    const mapboxUrl: string = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

    onMounted(() => {
      // eslint-disable-next-line no-use-before-define
      const L = require('leaflet')
      const map = new L.Map('map').setView([45.75418, 21.23398], 13)

      L.tileLayer(mapboxUrl, {
        attribution: 'Hărți de la &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> și © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'arpadgabor/cknavnn1k061m17o6id3mhd28',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapboxKey
      }).addTo(map)
    })

    return {}
  }
})
</script>

<template>
  <div id="map" class="h-[400px] w-full" />
</template>
