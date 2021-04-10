<script lang="ts">
import { defineComponent, useAsync, useContext, useMeta } from '@nuxtjs/composition-api'
import { Page } from '@/cms/types'
import { IContentDocument } from '@nuxt/content/types/content'
import { Markdown } from '@/components/general'
import { parseMeta } from '@/utils/parseMeta'

import { Sidenav, LinkBack } from '@/components/page-layout'

export default defineComponent({
  name: 'Page',
  components: {
    Markdown,
    Sidenav,
    LinkBack
  },
  transition: 'fade',
  setup () {
    const { $content, params, error } = useContext()

    async function fetchCurrentPage (path: string): Promise<(Page & IContentDocument)> {
      const page = await $content({ deep: true }).where({ fullPath: path }).fetch<Page>()

      if (!page || !page.length) {
        throw error({ statusCode: 404, message: 'Pagina nu a fost găsită.' })
      }

      return Array.isArray(page) ? page[0] : page
    }

    const rawPath = params.value.pathMatch
    const path = rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath

    const page = useAsync(async () => {
      const page = await fetchCurrentPage(path)

      return page
    }, path)

    useMeta(() => ({
      title: page.value?.title,
      meta: parseMeta(page.value?.title!, page.value?.description!, page.value?.image?.src)
    }))

    return {
      page,
      path
    }
  },
  head: {}
})
</script>

<template>
  <div v-if="page" class="container grid grid-cols-1 lg:grid-cols-12 gap-8">
    <article class="col-span-full lg:col-span-8">
      <header class="mb-8">
        <LinkBack :path="path" />

        <h1 class="text-4xl font-bold tracking-tighter dark:text-white">
          {{ page.title }}
        </h1>
      </header>

      <main>
        <Markdown :body="page.body" class="w-full" />
      </main>
    </article>

    <Sidenav :page="path" />
  </div>
</template>
