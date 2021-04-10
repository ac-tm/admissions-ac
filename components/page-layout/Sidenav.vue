<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Card } from '@/components/ui/layout'
import { Page } from '~/cms/types'

export default defineComponent({
  name: 'PageSidenav',
  components: {
    Card
  },
  props: {
    page: { type: String, required: true }
  },
  setup (props) {
    const { $content } = useContext()

    const getDepth = (path: string) => {
      if (path === '/') { return 0 }
      return path.split('/').length
    }

    async function fetchSiblings (path: string): Promise<(Page & IContentDocument)[]> {
      const paths = path.split('/')
      if (paths?.length) { paths.pop() }

      const parentPath = paths.join('/') || '/'

      const pages = parentPath === '/'
        ? await $content('pages', { deep: true })
          .fetch<Page>() as (Page & IContentDocument)[]
        : await $content('pages', { deep: true })
          .where({ fullPath: { $contains: parentPath } })
          .fetch<Page>() as (Page & IContentDocument)[]

      const depth = getDepth(parentPath)

      return pages.filter(page => getDepth(page.fullPath) === depth + 1)
    }

    async function fetchDirectChidlren (path: string): Promise<(Page & IContentDocument)[]> {
      const pages = await $content('pages', { deep: true })
        .where({ fullPath: { $contains: path } })
        .fetch<Page>() as (Page & IContentDocument)[]

      const depth = getDepth(path)

      return pages.filter(page => getDepth(page.fullPath) === depth + 1)
    }

    const pages = useAsync(async () => {
      const children = await fetchDirectChidlren(props.page)

      if (!children.length) {
        const siblings = await fetchSiblings(props.page)

        return siblings
      }
      return children
    }, props.page + '/nav')

    return {
      pages
    }
  }
})
</script>

<template>
  <aside
    v-if="pages && pages.length"
    class="col-span-full lg:col-span-4 dark:text-white"
  >
    <Card class="bg-gray-50 dark:bg-gray-800 !px-4 transition">
      <header class="px-4">
        <h2 class="text-lg font-bold mb-4">
          Alte pagini aici
        </h2>
      </header>

      <main class="flex flex-col space-y-2">
        <nuxt-link
          v-for="item of pages"
          :key="item.fullPath"
          :to="'/' + item.fullPath + '/'"
          active-class="!bg-secondary !text-white"
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
</template>
