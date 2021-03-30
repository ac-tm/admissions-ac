<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Content from './HeroContent.vue'
import Artwork from './HeroArtwork.vue'

export default defineComponent({
  name: 'Hero',
  components: {
    Content,
    Artwork,
  },
})
</script>

<template>
  <section class="flex flex-col md:flex-row items-center">
    <Content class="w-full md:w-1/2" />
    <Artwork class="hidden md:block md:w-1/2" />
  </section>
</template>
