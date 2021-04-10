<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Map } from '@/components/general'
import { Logo } from '@/components/logo'

export default defineComponent({
  name: 'MapPage',
  components: {
    Map,
    Logo
  },
  layout: 'none',
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
    <nuxt-link to="/" class="h-12 p-8 absolute left-0 top-0 z-30">
      <Logo class="text-white h-12" />
    </nuxt-link>

    <Map :locations="locations" class="h-screen z-10" />
  </div>
</template>
