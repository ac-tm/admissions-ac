<script lang="ts">
import { defineComponent, PropType, useAsync, useContext } from '@nuxtjs/composition-api'
import { MapSection, Location } from '~/cms/types'

export default defineComponent({
  name: 'Testimonials',
  props: {
    document: { type: Object as PropType<MapSection>, required: true }
  },
  setup () {
    const { $content } = useContext()

    const locations = useAsync(async () => {
      return await $content('locations').fetch<Location>()
    }, 'locations')

    return {
      locations
    }
  }
})
</script>

<template>
  <section v-if="locations">
    {{ document }}
    {{ locations }}
  </section>
</template>
