<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { onMounted } from '@vue/runtime-core'

interface Logo {
  image: string
  name: string
}

export default defineComponent({
  name: 'LogoGrid',
  props: {
    items: { type: String, required: true }
  },
  setup (props) {
    const logos = computed<Logo[]>(() => {
      if (!props.items) { return }
      if (props.items === '[]') { return }
      return JSON.parse(props.items.replace(/\|/g, '"'))
    })

    return {
      logos
    }
  }
})
</script>

<template>
  <div v-if="logos" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-12">
    <figure v-for="logo of logos" :key="logo.image" class="filter grayscale">
      <img :src="logo.image" :alt="`Logo ${logo.name}`" :title="logo.name" class="w-full h-full object-contain">
    </figure>
  </div>
</template>
