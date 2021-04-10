<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Page } from '~/cms/types'

export default defineComponent({
  name: 'LinkBack',
  props: {
    path: { type: String, required: true }
  },
  setup (props) {
    const { $content } = useContext()

    async function fetchParent (path: string): Promise<(Page & IContentDocument) | undefined> {
      const parentPath = path.split('/')
      parentPath.pop()
      if (!parentPath) { return }

      const result = await $content({ deep: true })
        .where({ fullPath: parentPath.join('/') })
        .fetch<Page>()

      const page = Array.isArray(result) ? result[0] : result
      if (!page) { return undefined }
      return page
    }

    const page = useAsync(async () => {
      return await fetchParent(props.path)
    }, props.path + '/link-back')

    return {
      page
    }
  }
})
</script>

<template>
  <nuxt-link
    v-if="page"
    :to="'/' + page.fullPath + '/'"
    class="flex items-center space-x-4 text-sm opacity-75 pb-4 py-2 dark:text-white"
  >
    <i class="gg-arrow-left" />
    <span>
      Înapoi ({{ page.title }})
    </span>
  </nuxt-link>
</template>
