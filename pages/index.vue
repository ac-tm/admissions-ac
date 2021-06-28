<script lang="ts">
import {
  defineComponent,
  onMounted,
  useAsync,
  useContext,
  useMeta,
  useRoute
} from '@nuxtjs/composition-api'
import { Button } from '@/components/ui/forms'
import { parseMeta } from '~/utils/parseMeta'
import { Site } from '~/cms/types'

export default defineComponent({
  name: 'Home',
  components: {
    Button
  },
  layout: 'simple',
  transition: 'fade',
  setup() {
    const route = useRoute()
    const { $content } = useContext()

    onMounted(() => {
      if (!route.value.fullPath.includes('token')) {
        return
      }

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
      meta: parseMeta(
        site.value?.title!,
        site.value?.description!,
        site.value?.image!
      )
    }))

    return {
      site
    }
  },
  head: {}
})
</script>

<template>
  <div
    v-if="site"
    class="container min-h-screen flex flex-1 sm:-mt-14 mt-4 items-center"
  >
    <div
      v-if="site.licenta && site.master"
      class="mx-auto max-w-2xl grid gap-8 sm:grid-cols-2"
    >
      <nuxt-link
        v-for="(link, idx) of [site.licenta, site.master]"
        :key="idx"
        :to="link.link"
        :title="`${link.button}`"
        :class="[
          'flex flex-col space-y-4 p-8',
          'rounded-lg bg-gray-50 dark:bg-gray-800',
          'transform hover:scale-[1.025] transition'
        ]"
      >
        <figure v-if="link.image" class="w-full mb-4">
          <img
            :src="link.image"
            :alt="`Ilustrație ${link.title}`"
            aria-hidden="true"
            role="presentation"
            class="object-contain"
          />
        </figure>

        <h2 class="text-2xl font-bold tracking-tight dark:text-white">
          {{ link.title }}
        </h2>

        <p>
          {{ link.description }}
        </p>

        <Button
          :theme="idx % 2 === 0 ? 'primary' : 'secondary'"
          class="flex justify-between"
          tabindex="-1"
        >
          {{ link.button }}
          <i class="gg-arrow-right" />
        </Button>
      </nuxt-link>
    </div>
  </div>
</template>
