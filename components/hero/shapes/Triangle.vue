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

const rotations: Record<string, string> = {
  0: 'rotate-0',
  90: 'rotate-90',
  180: 'rotate-180',
  '-90': '-rotate-90',
}

export default defineComponent({
  name: 'ArtworkTriangle',
  props: {
    color: { type: String, default: 'primary' },
    rotate: { type: String, default: '0' },
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
        rotateZ: '+=90deg',
        duration: 2000,
      })
      reset()
    }

    return {
      element,
      flip,
      colors,
      rotations,
    }
  },
})
</script>

<template>
  <svg
    ref="element"
    :class="[colors[color], 'transform', rotations[rotate]]"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @mouseenter="flip"
  >
    <path d="M0.0884399 0L80.0884 80H0.0884399V0Z" fill="currentColor" />
  </svg>
</template>
