<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import { Footer } from '@/components/footer'
import { Navigation, Banner } from '~/components/nav'

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

    return {}
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Banner />
    <transition name="fade" appear>
      <Navigation class="sticky" />
    </transition>
    <div class="flex-1 pt-16 min-h-screen">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>
