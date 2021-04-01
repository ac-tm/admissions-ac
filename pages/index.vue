<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Hero } from '@/components/hero'

export default defineComponent({
  name: 'Home',
  components: {
    Hero
  }
})
</script>

<template>
  <div class="container pt-32 h-[200vh]">
    <Hero />
  </div>
</template>
