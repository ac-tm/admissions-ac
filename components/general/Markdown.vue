<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DocumentCheckbox from './DocumentCheckbox.vue'
import Fig from './Figure.vue'
import Attachment from './Attachment.vue'
import Block from './Block.vue'
import Timeline from './timeline'

export default defineComponent({
  name: 'Markdown',

  /* eslint-disable vue/no-unused-components */
  components: {
    DocumentCheckbox,
    Fig,
    Timeline,
    Attachment,
    Block
  },

  props: {
    body: { type: [Object], required: true }
  }
})
</script>

<template>
  <NuxtContent class="prose" :document="{ body }" />
</template>
