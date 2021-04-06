<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import Specializations from './Specializations.vue'
import Pages from './Pages.vue'
import Testimonials from './Testimonials.vue'
import Locations from './Locations.vue'

import { HomepageSection } from '~/cms/types'

export default defineComponent({
  name: 'Sections',
  components: {
    Specializations,
    Pages,
    Testimonials,
    Locations
  },
  setup () {
    const { $content } = useContext()

    const sections = useAsync(async () => {
      const result = await $content('sections').fetch<HomepageSection>()

      return Array.isArray(result) ? result[0].items : result.items
    }, 'sections')

    return {
      sections
    }
  }
})
</script>

<template>
  <div v-if="sections" class="space-y-8">
    <component :is="section.type" v-for="(section, idx) of sections" :key="idx" :document="section" />
  </div>
</template>
