<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import { Navigation, Banner } from '@/components/nav'
import { Footer } from '@/components/footer'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Navigation,
    Footer,
    Banner
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
    <Banner />
    <Navigation class="sticky" />
    <div class="flex-1 pt-16 min-h-[80vh]">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>
