<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Navigation } from '@/components/nav'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Navigation
  }
})
</script>

<template>
  <div>
    <Navigation />
    <Nuxt />
  </div>
</template>
