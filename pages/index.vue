<script lang="ts">
import { defineComponent, onMounted, useAsync, useContext, useMeta, useRoute } from '@nuxtjs/composition-api'
import { Hero } from '@/components/hero'
import { IContentDocument } from '@nuxt/content/types/content'
import { Sections } from '~/components/home-sections'
import { parseMeta } from '~/utils/parseMeta'

interface Site {
  title: string
  description: string
  image: string
}

export default defineComponent({
  name: 'Home',
  components: {
    Hero,
    Sections
  },
  setup () {
    const route = useRoute()
    const { $content } = useContext()

    onMounted(() => {
      if (!route.value.fullPath.includes('token')) { return }

      const url = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      document.getElementsByTagName('head')[0].appendChild(script)
    })

    const cfg = useAsync(async () => {
      const cfg = await $content('site').fetch<Site>()
      return Array.isArray(cfg) ? cfg[0] : cfg
    }, 'config')

    if (cfg.value) {
      useMeta({
        title: cfg.value.title,
        meta: parseMeta(cfg.value.title, cfg.value.description, cfg.value.image)
      })
    }

    return {}
  },
  head: {}
})
</script>

<template>
  <div class="container min-h-[200vh] space-y-32">
    <Hero />
    <Sections />
  </div>
</template>
