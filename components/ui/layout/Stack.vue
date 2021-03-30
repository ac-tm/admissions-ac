<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type Spacing = 'none' | 'sm' | 'normal' | 'lg' | 'xl' | '2xl'
const spacing: Record<Spacing, string> = {
  none: 'space-y-0',
  sm: 'space-y-2',
  normal: 'space-y-4',
  lg: 'space-y-8',
  xl: 'space-y-16',
  '2xl': 'space-y-24',
}

export default defineComponent({
  name: 'Stack',
  props: {
    as: { type: String, default: 'div' },
    flex: { type: Boolean, default: false },
    space: { type: String as PropType<Spacing>, default: 'normal' },
  },
  setup() {
    return {
      spacing,
    }
  },
})
</script>

<template>
  <component :is="as" :class="[flex && 'flex flex-col', spacing[space]]">
    <slot />
  </component>
</template>
