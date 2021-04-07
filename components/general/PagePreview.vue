<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Card } from '@/components/ui/layout'
import { Button } from '@/components/ui/forms'
import { Page } from '~/cms/types'

export default defineComponent({
  name: 'PagePreview',
  components: {
    Card,
    Button
  },
  props: {
    slug: { type: String, required: true }
  },
  setup (props) {
    const { $content } = useContext()

    const page = useAsync(async () => {
      const result = await $content({ deep: true }).where({ fullPath: props.slug }).fetch<Page>()

      return Array.isArray(result) ? result[0] : result
    }, props.slug)

    return {
      page
    }
  }
})
</script>

<template>
  <Card v-if="page" as="article" class="bg-gray-50 dark:bg-gray-800 flex flex-col lg:flex-row space-y-8 lg:space-y-0 space-x-0 lg:space-x-8">
    <figure v-if="page.image" class="w-full lg:w-1/3 h-full">
      <img :src="page.image.src" :alt="page.image.alt" class="object-cover rounded-lg h-full w-full">
    </figure>

    <div class="flex flex-col items-start justify-center w-full lg:w-2/3 space-y-4">
      <h2 class="text-2xl font-bold tracking-tight text-primary dark:text-white">
        {{ page.title }}
      </h2>

      <p>
        {{ page.description }}
      </p>

      <Button theme="secondary" :to="'/' + page.fullPath + '/'">
        <span>Citește mai multe</span>

        <i class="gg-arrow-right ml-4" />
      </Button>
    </div>
  </Card>
</template>
