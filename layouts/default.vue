<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Navigation,
    Footer
  },
  transition: 'fade'
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <div class="flex-1 pt-28 min-h-screen">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>
