<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type Theme = 'primary' | 'secondary' | 'light'
type Size = 'lg' | 'normal' | 'sm'

/**
 * By adding the `to` prop the component will automatically render as a link (as `anchor` or `nuxt-link`).
 */
export default defineComponent({
  name: 'UIButton',
  props: {
    theme: { type: String as PropType<Theme>, default: 'light' },
    size: { type: String as PropType<Size>, default: 'normal' },
    to: { type: String, required: false, default: undefined }
  },
  setup (props) {
    const sizes: Record<Size, string> = {
      sm: 'h-6 rounded px-2 text-sm',
      normal: 'h-10 rounded-lg px-4 text-base',
      lg: 'h-12 rounded-lg px-4 text-lg'
    }

    const themes: Record<Theme, string> = {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-white',
      light: 'bg-gray-50 text-gray-800'
    }

    const style = [
      'font-bold transition duration-300 transform will-change',
      'flex items-center',
      sizes[props.size],
      themes[props.theme],
      'hover:scale-[1.02] hover:shadow-lg',
      'active:scale-[0.98] active:shadow-sm',
      'focus:outline-none focus:ring'
    ]

    const isButton = () => !props.to
    const isInternal = () => props.to.charAt(0) === '/'
    const aOrLink = () => (isInternal() ? 'nuxt-link' : 'a')

    const attrs = {
      class: style,
      is: isButton() ? 'button' : aOrLink(),
      type: isButton() ? 'button' : undefined,
      to: !isButton() && isInternal() ? props.to : undefined,
      href: !isButton() && isInternal() ? undefined : props.to
    }

    return {
      attrs
    }
  }
})
</script>

<template>
  <component :is="attrs.is" v-bind="attrs">
    <slot />
  </component>
</template>
