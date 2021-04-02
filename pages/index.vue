<script lang="ts">
import { defineComponent, onMounted, useRoute } from '@nuxtjs/composition-api'
import { Hero } from '@/components/hero'

export default defineComponent({
  name: 'Home',
  components: {
    Hero
  },
  setup () {
    const route = useRoute()

    onMounted(() => {
      if (!route.value.fullPath.includes('token')) { return }

      const url = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }
})
</script>

<template>
  <div class="container min-h-[200vh]">
    <Hero />
    <div class="pt-16">
      <nuxt-link to="/licen" class="mt-8">
        Test pages
      </nuxt-link>
    </div>
  </div>
</template>
