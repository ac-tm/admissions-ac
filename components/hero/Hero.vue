<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import Content from './HeroContent.vue'
import Artwork from './HeroArtwork.vue'
import { Hero } from '~/cms/types'

export default defineComponent({
  name: 'Hero',
  components: {
    Content,
    Artwork
  },
  props: {
    hero: { type: Object as PropType<Hero>, required: true }
  }
})
</script>

<template>
  <section class="flex flex-col md:flex-row items-center">
    <Content :hero="hero" class="w-full md:w-1/2" />
    <Artwork class="hidden md:block md:w-1/2" />
  </section>
</template>
