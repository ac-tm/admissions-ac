<script lang="ts">
import { defineComponent, useAsync, useContext, useMeta } from '@nuxtjs/composition-api'
import { Hero } from '@/components/hero'
import { Sections } from '~/components/home-sections'
import { parseMeta } from '~/utils/parseMeta'
import { LandingPage } from '~/cms/types'

export default defineComponent({
  name: 'Home',
  components: {
    Hero,
    Sections
  },
  transition: 'fade',
  setup () {
    const { $content } = useContext()

    const page = useAsync(async () => {
      const result = await $content('licenta').fetch<LandingPage>()

      return Array.isArray(result) ? result[0] : result
    }, 'licenta')

    useMeta(() => ({
      title: page.value?.meta?.title!,
      meta: parseMeta(page.value?.meta?.title!, page.value?.meta?.description!, page.value?.meta?.image!)
    }))

    return {
      page
    }
  },
  head: {}
})
</script>

<template>
  <div v-if="page" class="container min-h-[200vh] space-y-32">
    <Hero :hero="page.hero" />
    <Sections :sections="page.sections" />
  </div>
</template>
