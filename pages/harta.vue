<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Map } from '@/components/general'

export default defineComponent({
  name: 'MapPage',
  components: {
    Map
  },
  layout: 'map',
  transition: 'fade',
  setup () {
    const { $content } = useContext()

    const locations = useAsync(async () => {
      const result = await $content('locations').fetch<Location>()

      return Array.isArray(result) ? result : null
    }, 'locations')

    return {
      locations
    }
  },
  head: {
    title: 'Harta locațiilor de interes pentru studenți'
  }
})
</script>

<template>
  <div v-if="locations" class="h-screen w-screen">
    <Map :locations="locations" class="h-screen z-10" />
  </div>
</template>
