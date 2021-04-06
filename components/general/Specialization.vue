<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Card } from '@/components/ui/layout'

const colors: Record<string, string> = {
  blue: 'bg-blue-400 bg-opacity-20',
  green: 'bg-green-400 bg-opacity-20',
  red: 'bg-red-400 bg-opacity-20',
  purple: 'bg-purple-400 bg-opacity-20',
  yellow: 'bg-yellow-400 bg-opacity-20',
  gray: 'bg-gray-300 bg-opacity-20'
}

export default defineComponent({
  name: 'Specialization',
  components: { Card },
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true }
  },
  setup () {
    return { colors }
  }
})
</script>

<template>
  <Card :class="colors[color]">
    <h3 class="text-2xl font-bold tracking-tight leading-none mb-4">
      {{ title }}
    </h3>
    <p>
      {{ description }}
    </p>
  </Card>
</template>
