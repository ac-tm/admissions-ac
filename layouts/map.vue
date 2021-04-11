<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import { Navigation } from '@/components/nav'

export default defineComponent({
  name: 'MapLayout',
  components: {
    Navigation
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
  <div class="h-screen flex flex-col">
    <Navigation class="fixed top-0 left-0" />
    <div class="flex-1 mh-screen">
      <Nuxt />
    </div>
  </div>
</template>
