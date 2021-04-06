<script lang="ts">
import { defineComponent, PropType, useAsync, useContext } from '@nuxtjs/composition-api'
import { Card } from '@/components/ui/layout'
import { Button } from '@/components/ui/forms'
import { Specialization } from '@/components/general'

import { Specialization as SpecT, SpecializationSection } from '~/cms/types'

export default defineComponent({
  name: 'Specializations',
  components: {
    Card,
    Specialization,
    Button
  },
  props: {
    document: { type: Object as PropType<SpecializationSection>, required: true }
  },
  setup (props) {
    const { $content } = useContext()

    const specializations = useAsync(async () => {
      return (await Promise.all(
        props.document.items.map(
          async item => ({
            ...(await $content('specializations', item.specialization).fetch<SpecT>()),
            width: item.width
          })
        )
      )).flat()
    }, 'specializations')

    return {
      specializations
    }
  }
})
</script>

<template>
  <Card as="section" class="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8 bg-gray-50 dark:bg-gray-800">
    <div class="w-full lg:w-1/3 space-y-8 flex flex-col items-start">
      <h2 class="text-4xl font-bold tracking-tight text-primary dark:text-white">
        {{ document.title }}
      </h2>

      <p>
        {{ document.description }}
      </p>

      <Button theme="secondary" :to="document.cta.path">
        {{ document.cta.label }}
        <i class="gg-arrow-right ml-4" />
      </Button>
    </div>

    <div v-if="specializations" class="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Specialization
        v-for="spec of specializations"
        :key="spec.slug"
        :title="spec.title"
        :description="spec.description"
        :color="spec.color"
        :class="spec.width === 'full' ? 'col-span-full' : 'col-span-1'"
      />
    </div>
  </Card>
</template>
