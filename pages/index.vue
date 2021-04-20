<script lang="ts">
import { defineComponent, onMounted, useAsync, useContext, useMeta, useRoute } from '@nuxtjs/composition-api'
import { parseMeta } from '~/utils/parseMeta'
import { Site } from '~/cms/types'

export default defineComponent({
  name: 'Home',
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

    const site = useAsync(async () => {
      const result = await $content('site').fetch<Site>()

      return Array.isArray(result) ? result[0] : result
    }, 'site')

    useMeta(() => ({
      title: site.value?.title!,
      meta: parseMeta(site.value?.title!, site.value?.description!, site.value?.image!)
    }))

    return {
      site
    }
  },
  head: {}
})
</script>

<template>
  <div v-if="site" class="container space-y-32">
    <p>
      {{ site }}
    </p>
  </div>
</template>
