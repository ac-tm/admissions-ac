<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import anime from 'animejs'
import debounce from 'lodash/debounce'

const colors: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  gray: 'text-gray-200 dark:text-gray-700',
  offblue: 'text-[#E1E5FF] dark:opacity-50',
  blue: 'text-[#3548CA]'
}

export default defineComponent({
  name: 'ArtworkSquare',
  props: {
    color: { type: String, default: 'primary' }
  },
  setup () {
    const element = ref<HTMLElement>()

    const flips = ref<number>(0)
    const reset = debounce(() => {
      anime({
        targets: element.value,
        rotateX: '0deg',
        rotateY: '0deg',
        rotateZ: '0deg',
        duration: 2500 * flips.value
      })
      flips.value = 0
    }, 10000)
    const flip = () => {
      anime({
        targets: element.value,
        rotateZ: '-=90deg'
      })
      flips.value++
      reset()
    }

    return {
      element,
      flip,
      colors
    }
  }
})
</script>

<template>
  <svg
    ref="element"
    :class="colors[color]"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @mouseenter="flip"
  >
    <rect x="0.0884399" width="80" height="80" fill="currentColor" />
  </svg>
</template>
