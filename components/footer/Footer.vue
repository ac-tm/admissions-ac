<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Foot',
  setup () {
    const { $colorMode } = useContext()

    const switchMap: Record<string, string> = {
      dark: 'light',
      light: 'dark'
    }

    function switchMode () {
      $colorMode.preference = switchMap[$colorMode.value]
    }

    const isLight = computed(() => $colorMode.value === 'light')

    return {
      isLight,
      switchMode
    }
  }
})
</script>

<template>
  <footer class="w-full bg-gray-50 dark:bg-gray-800 transition mt-16">
    <div class="container py-8">
      <button
        type="button"
        class="h-10 w-10 flex items-center justify-center text-gray-600 dark:text-gray-200 transition"
        @click.prevent="switchMode()"
      >
        <i v-if="isLight" class="gg-sun" />
        <i v-else class="gg-moon" />
      </button>
    </div>
  </footer>
</template>
