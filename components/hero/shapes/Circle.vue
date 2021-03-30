<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import anime from 'animejs'
import debounce from 'lodash/debounce'

const colors: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  gray: 'text-gray-200',
  offblue: 'text-[#E1E5FF]',
  blue: 'text-[#3548CA]',
}

export default defineComponent({
  name: 'ArtworkCircle',
  props: {
    color: { type: String, default: 'primary' },
  },
  setup() {
    const element = ref<HTMLElement>()

    const reset = debounce(() => {
      anime({
        targets: element.value,
        rotateX: '0deg',
        rotateY: '0deg',
        rotateZ: '0deg',
        duration: 5000,
      })
    }, 10000)

    const flip = () => {
      anime({
        targets: element.value,
        rotateX: ['0deg', '+=360deg'],
        rotateY: ['0deg', '+=360deg'],
        duration: 5000,
      })

      reset()
    }

    return {
      element,
      flip,
      colors,
    }
  },
})
</script>

<template>
  <svg
    ref="element"
    :class="[colors[color]]"
    style="perspective: 1000px"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @mouseenter="flip"
  >
    <rect x="0.0884399" width="80" height="80" rx="40" fill="currentColor" />
  </svg>
</template>
