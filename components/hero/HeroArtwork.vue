<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import anime from 'animejs'
import { Square, Circle, Triangle, QuarterCircle } from './shapes'
import { shapes } from './spapegrid'

export default defineComponent({
  name: 'HeroArtwork',
  components: {
    ShSquare: Square,
    ShCircle: Circle,
    ShTriangle: Triangle,
    ShQuarterCircle: QuarterCircle
  },
  setup () {
    onMounted(() => {
      anime({
        targets: '.shape',
        scale: [0, 1],
        rotateZ: ['20deg', '0deg'],
        delay: anime.stagger(75)
      })
    })

    return {
      shapes
    }
  }
})
</script>

<template>
  <figure>
    <div class="artwork-grid">
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
  display: grid;
  place-content: center;
  grid-template: repeat(6, 80px) / repeat(6, 80px);
}
</style>
