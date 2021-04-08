<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Fig',
  props: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    caption: { type: String, default: undefined }
  }
})
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <figure>
      <NuxtImg :src="src" :alt="alt" fit="cover" class="rounded-lg" />

      <figcaption v-if="caption">
        {{ caption }}
      </figcaption>
    </figure>
  </div>
</template>
