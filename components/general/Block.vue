<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Block',
  props: {
    color: { type: String, default: 'gray' }
  },
  setup () {
    const colors: Record<string, string> = {
      gray: 'bg-gray-50 dark:bg-gray-800 transition',
      red: 'bg-red-100 dark:bg-red-900 dark:bg-opacity-[0.4] transition',
      green: 'bg-green-100 dark:bg-green-900 dark:bg-opacity-[0.4] transition',
      yellow: 'bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-[0.4] transition'
    }
    return {
      colors
    }
  }
})
</script>

<template>
  <div class="p-4 md:p-8 rounded-lg my-8" :class="colors[color]">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
h2:first-of-type {
  @apply mt-0 !important;
}

p:first-of-type {
  @apply mt-0 !important;
}
p:last-of-type {
  @apply mb-0 !important;
}
</style>
