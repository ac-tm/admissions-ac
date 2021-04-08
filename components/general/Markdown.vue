<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DocumentCheckbox from './DocumentCheckbox.vue'
import Figure from './Figure.vue'

export default defineComponent({
  name: 'Markdown',

  /* eslint-disable vue/no-unused-components */
  components: {
    DocumentCheckbox,
    Figure
  },

  props: {
    body: { type: [Object], required: true }
  }
})
</script>

<template>
  <NuxtContent class="prose" :document="{ body }" />
</template>
