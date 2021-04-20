<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
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
  props: {
    sections: { type: Array as PropType<HomepageSection[]>, required: true }
  }
})
</script>

<template>
  <div v-if="sections" class="space-y-8">
    <component :is="section.type" v-for="(section, idx) of sections" :key="idx" :document="section" />
  </div>
</template>
