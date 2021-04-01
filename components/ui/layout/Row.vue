<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type Spacing = 'none' | 'sm' | 'normal' | 'lg' | 'xl' | '2xl'
const spacing: Record<Spacing, string> = {
  none: 'space-x-0',
  sm: 'space-x-2',
  normal: 'space-x-4',
  lg: 'space-x-8',
  xl: 'space-x-16',
  '2xl': 'space-x-24'
}

export default defineComponent({
  name: 'Stack',
  props: {
    as: { type: String, default: 'div' },
    flex: { type: Boolean, default: false },
    wrap: { type: Boolean, default: true },
    space: { type: String as PropType<Spacing>, default: 'normal' }
  },
  setup () {
    return {
      spacing
    }
  }
})
</script>

<template>
  <component
    :is="as"
    :class="[
      flex ? 'flex flex-row' : 'inline',
      wrap && 'flex-wrap',
      spacing[space],
    ]"
  >
    <slot />
  </component>
</template>
