<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import anime from 'animejs'

import { Square, Circle, Triangle, QuarterCircle } from './shapes'

interface Shape {
  type: null | 'ShSquare' | 'ShCircle' | 'ShTriangle' | 'ShQuarterCircle'
  rotation?: '0' | '90' | '-90' | '180'
  color?: 'primary' | 'secondary' | 'offblue' | 'gray' | 'blue'
}

const shapes: Shape[] = [
  // Row 1
  { type: null },
  { type: 'ShTriangle', color: 'primary' },
  { type: null },
  { type: null },
  { type: null },
  { type: null },

  // Row 2
  { type: null },
  { type: null },
  { type: 'ShQuarterCircle', color: 'offblue' },
  { type: 'ShTriangle', color: 'secondary', rotation: '-90' },
  { type: null },
  { type: 'ShTriangle', color: 'primary' },

  // Row 3
  { type: null },
  { type: 'ShSquare', color: 'blue' },
  { type: 'ShQuarterCircle', color: 'secondary' },
  { type: 'ShQuarterCircle', color: 'blue' },
  { type: 'ShQuarterCircle', color: 'primary' },
  { type: null },

  // Row 4
  { type: 'ShQuarterCircle', color: 'offblue' },
  { type: 'ShCircle', color: 'secondary' },
  { type: null },
  { type: 'ShSquare', color: 'gray' },
  { type: null },
  { type: null },

  // Row 5
  { type: null },
  { type: 'ShTriangle', color: 'gray' },
  { type: 'ShQuarterCircle', color: 'primary', rotation: '90' },
  { type: null },
  { type: 'ShTriangle', color: 'blue', rotation: '90' },
  { type: null },

  // Row 6
  { type: null },
  { type: null },
  { type: 'ShTriangle', color: 'secondary', rotation: '90' },
  { type: null },
  { type: null },
  { type: null },
]

export default defineComponent({
  name: 'HeroArtwork',
  components: {
    ShSquare: Square,
    ShCircle: Circle,
    ShTriangle: Triangle,
    ShQuarterCircle: QuarterCircle,
  },
  setup() {
    onMounted(() => {
      anime({
        targets: '.shape',
        scale: [0, 1],
        rotateZ: ['20deg', '0deg'],
        delay: anime.stagger(75),
      })
    })
    return {
      shapes,
    }
  },
})
</script>

<template>
  <figure>
    <div class="grid artwork-grid place-content-center">
      <component
        :is="shape.type || 'div'"
        v-for="(shape, idx) of shapes"
        :key="idx"
        class="h-full w-full"
        :class="shape.type && 'shape'"
        style="transform: scale(0); perspective: 1000px"
        :rotate="shape.rotation"
        :color="shape.color"
      />
    </div>
  </figure>
</template>

<style lang="postcss" scoped>
.artwork-grid {
  grid-template: repeat(6, 80px) / repeat(6, 80px);
}
</style>
