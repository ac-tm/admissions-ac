<script lang="ts">
import { defineComponent, PropType, useAsync, useContext } from '@nuxtjs/composition-api'
import { Card } from '@/components/ui/layout'
import { Button } from '@/components/ui/forms'
import { Map } from '@/components/general'

import { MapSection, Location } from '~/cms/types'

export default defineComponent({
  name: 'Testimonials',
  components: {
    Map, Card, Button
  },
  props: {
    document: { type: Object as PropType<MapSection>, required: true }
  },
  setup () {
    const { $content } = useContext()

    const locations = useAsync(async () => {
      const result = await $content('locations').fetch<Location>()

      return Array.isArray(result) ? result : null
    }, 'locations')

    return {
      locations
    }
  }
})
</script>

<template>
  <Card v-if="locations" as="section" class="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8 bg-gray-50 dark:bg-gray-800 min-h-[64] isolate">
    <div class="w-full lg:w-2/3 h-full overflow-hidden rounded-lg">
      <Map :locations="locations" class="h-[400px]" />
    </div>

    <div class="w-full lg:w-1/3 space-y-8 flex flex-col items-start">
      <h2 class="text-4xl font-bold tracking-tight text-primary dark:text-white">
        {{ document.title }}
      </h2>

      <p>
        {{ document.description }}
      </p>

      <Button theme="secondary" :to="document.cta.path + '/'">
        {{ document.cta.label }}
        <i class="gg-arrow-right ml-4" />
      </Button>
    </div>
  </Card>
</template>
