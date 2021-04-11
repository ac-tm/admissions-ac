<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Tree } from '@/components/page-tree'
import { Page } from '~/cms/types'

type ContentPage = IContentDocument & Page

interface TreeNode {
  page: ContentPage
  children: TreeNode[] | null
}

export default defineComponent({
  name: 'Sitemap',
  components: { Tree },
  transition: 'fade',
  setup () {
    const { $content, error } = useContext()

    const getDepth = (path: string): number => path.includes('/') ? path.split('/').length : 1

    const tree = useAsync(async () => {
      const pageList = await $content('pages', { deep: true }).only(['fullPath', 'title']).fetch<Page>()

      if (!Array.isArray(pageList)) { return error({ statusCode: 500, message: 'A apărut o eroare.' }) }

      function getPageTree (current: ContentPage): TreeNode[] | null {
        const currentPath = current.fullPath

        const children: ContentPage[] = pageList.filter((pg: ContentPage) => {
          if (pg.fullPath.startsWith(currentPath)) {
            return getDepth(pg.fullPath) === getDepth(currentPath) + 1
          }
          return false
        })

        if (!children.length) {
          return null
        } else {
          return children.map(child => ({
            page: child,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            children: getPageTree(child)
          }))
        }
      }

      const tree = pageList.filter(page => !page.fullPath.includes('/')).map(page => ({
        page,
        children: getPageTree(page)
      }))

      return tree
    })

    return {
      tree
    }
  }
})
</script>

<template>
  <main v-if="tree" class="container">
    <h1 class="text-4xl font-bold tracking-tighter dark:text-white mb-8">
      Harta site-ului
    </h1>

    <Tree :tree="tree" />
  </main>
</template>
