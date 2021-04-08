<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Navigation,
    Footer
  },
  transition: 'fade',
  setup () {
    const { $content } = useContext()

    onMounted(() => {
      $content().fetch()
    })
  }
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
