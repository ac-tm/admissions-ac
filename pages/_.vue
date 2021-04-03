<script lang="ts">
import { defineComponent, onMounted, useAsync, useContext } from '@nuxtjs/composition-api'
import { Page } from '@/cms/types'
import { IContentDocument } from '@nuxt/content/types/content'
import { Card } from '@/components/ui/layout'
// import { Button } from '@/components/ui/forms'

export default defineComponent({
  name: 'Page',
  components: {
    Card
  },
  transition: 'fade',
  setup () {
    const { $content, params } = useContext()

    async function fetchCurrentPage (path: string): Promise<(Page & IContentDocument)> {
      const page = await $content({ deep: true }).where({ dir: `/pages/${path}` }).fetch<Page>()

      return Array.isArray(page) ? page[0] : page
    }

    async function fetchDirectChidlren (path: string): Promise<(Page & IContentDocument)[]> {
      const pages = await $content({ deep: true })
        .where({ dir: { $contains: `/pages/${path}/` } })
        .fetch<Page>() as (Page & IContentDocument)[]

      const getDepth = (path: string) => path.split('/').length
      const depth = getDepth(`/pages/${path}/`)

      return pages.filter(page => getDepth(page.dir) === depth).map(page => ({
        ...page,
        dir: page.dir.startsWith('/pages') ? page.dir.substr(6) : page.dir
      }))
    }

    async function fetchParent (path: string): Promise<(Page & IContentDocument) | undefined> {
      const parentPath = path.split('/')
      parentPath.pop()

      if (!parentPath) { return }

      const result = await $content({ deep: true })
        .where({ dir: `/pages/${parentPath.join('/')}` })
        .fetch<Page>()
      const page = Array.isArray(result) ? result[0] : result
      if (!page) { return undefined }
      return {
        ...page,
        dir: page.dir.substr(6)
      }
    }

    const result = useAsync(async () => {
      const raw = params.value.pathMatch
      const path = raw.endsWith('/') ? raw.slice(0, -1) : raw

      const page = await fetchCurrentPage(path)
      const nested = await fetchDirectChidlren(path)
      const parent = await fetchParent(path)

      return { page, nested, parent }
    }, params.value.pathMatch)

    return {
      result,
      params
    }
  }
})
</script>

<template>
  <main v-if="result" class="container grid grid-cols-1 lg:grid-cols-12 gap-8">
    <article class="col-span-full lg:col-span-8">
      <header class="mb-8">
        <nuxt-link
          v-if="result.parent"
          :to="result.parent.dir"
          class="flex items-center space-x-4 text-sm opacity-75 pb-4 py-2"
        >
          <i class="gg-arrow-left" />
          <span>
            Înapoi ({{ result.parent.title }})
          </span>
        </nuxt-link>

        <h1 class="text-4xl font-bold tracking-tighter">
          {{ result.page.title }}
        </h1>
      </header>

      <div class="w-full overflow-x-auto">
        <pre class="p-8 bg-gray-50 dark:bg-gray-800 dark:text-gray-100">{{ JSON.stringify(result.page, null, 2) }}</pre>
      </div>
    </article>

    <aside
      v-if="result.nested.length"
      class="col-span-full lg:col-span-4"
    >
      <Card class="bg-gray-50 dark:bg-gray-800 !px-4">
        <header class="px-4">
          <h2 class="text-lg font-bold mb-4">
            Conținut
          </h2>
        </header>
        <main class="flex flex-col space-y-2">
          <nuxt-link
            v-for="item of result.nested"
            :key="item.dir"
            :to="item.dir"
            :class="[
              'py-2 px-4 flex items-center justify-between',
              'hover:bg-gray-100 dark:hover:bg-gray-900',
              'rounded-lg transition'
            ]"
          >
            <span>
              {{ item.title }}
            </span>
            <i class="gg-arrow-right ml-4" />
          </nuxt-link>
        </main>
      </Card>
    </aside>
  </main>
</template>
