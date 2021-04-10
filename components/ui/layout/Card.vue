<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type Size = 'sm' | 'normal' | 'lg' | 'none'

export default defineComponent({
  name: 'Card',
  props: {
    as: { type: String, default: 'div' },
    size: { type: String as PropType<Size>, default: 'normal' }
  },
  setup (props) {
    const sizes: Record<Size, string> = {
      none: 'p-0 rounded-none',
      sm: 'p-2 md:p-4 rounded',
      normal: 'p-4 md:p-8 rounded-lg',
      lg: 'p-8 md:p-16 rounded-lg'
    }

    return {
      classes: [sizes[props.size]]
    }
  }
})
</script>

<template>
  <component :is="as" :class="[classes, 'transition']">
    <slot />
  </component>
</template>
