<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

  interface Image {
    src: string
    alt: string
  }

export default defineComponent({
  name: 'ImageGallery',
  props: {
    items: { type: String, required: true }
  },
  setup (props) {
    const images = computed<Image[]>(() => {
      if (!props.items) { return }
      if (props.items === '[]') { return }
      return JSON.parse(props.items.replace(/\|/g, '"'))
    })

    return {
      images
    }
  }
})
</script>

<template>
  <div v-if="images" class="grid grid-cols-2 md:grid-cols-3 place-items-center gap-4">
    <figure v-for="image of images" :key="image.src" class="h-36">
      <img :src="image.src" :alt="image.alt" :title="image.alt" class="w-full h-full object-cover rounded-lg transition" data-zoomable>
    </figure>
  </div>
</template>

<style lang="postcss">
.medium-zoom-overlay {
  z-index: 50;
}

.medium-zoom-image--opened {
  z-index: 51;
  object-fit: contain;
  border-radius: 0;
}

</style>
