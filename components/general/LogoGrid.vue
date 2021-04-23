<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'

interface Logo {
  image: string
  name: string
}

export default defineComponent({
  name: 'LogoGrid',
  setup () {
    const { $content } = useContext()

    const logos = useAsync(async () => {
      const result = await $content('partners').fetch<{ logos: Logo[] }>()
      return Array.isArray(result) ? result[0].logos : result.logos
    }, 'partners1')

    return { logos }
  }
})
</script>

<template>
  <div v-if="logos" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 place-items-center gap-4 md:gap-8">
    <figure v-for="logo of logos" :key="logo.image" class="p-2 rounded-lg bg-white">
      <img :src="logo.image" :alt="`Logo ${logo.name}`" :title="logo.name" class="w-full h-16 !object-contain !rounded-none">
    </figure>
  </div>
</template>
