<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Page } from '@/cms/types'

export default defineComponent({
  name: 'Page',
  setup () {
    const { $content, params } = useContext()

    const result = useAsync(async () => {
      const raw = params.value.pathMatch
      const path = raw.endsWith('/') ? raw.slice(0, -1) : raw

      const page = await $content({ deep: true }).where({ dir: `/pages/${path}` }).fetch<Page>()
      const nested = await $content({ deep: true }).where({ dir: { $contains: `/pages/${path}/` } }).fetch<Page>()

      return { page, nested }
    })

    return {
      result,
      params
    }
  }
})
</script>

<template>
  <main v-if="result" class="container mt-20">
    {{ params }}
    <div class="overflow-x-scroll w-3/4">
      <pre class="p-8 bg-gray-50 whitespace-nowrap">{{ JSON.stringify(result.page, null, 2) }}</pre>
    </div>
    <div class="w-1/4">
      {{ result.nested.length }}
    </div>
  </main>
</template>
