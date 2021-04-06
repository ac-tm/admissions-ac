<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { PagePreview } from '@/components/general'

import { PagesSection } from '~/cms/types'

export default defineComponent({
  name: 'Pages',
  components: {
    PagePreview
  },
  props: {
    document: { type: Object as PropType<PagesSection>, required: true }
  }
})
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <PagePreview v-for="slug of document.list" :key="slug" :slug="slug" />
  </section>
</template>
