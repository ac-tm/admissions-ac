<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Foot',
  setup () {
    const { $colorMode } = useContext()

    const switchMap: Record<string, string> = {
      dark: 'light',
      light: 'dark'
    }

    function switchMode () {
      $colorMode.preference = switchMap[$colorMode.value]
    }

    const isLight = computed(() => $colorMode.value === 'light')

    return {
      isLight,
      switchMode
    }
  }
})
</script>

<template>
  <footer class="w-full bg-gray-50 dark:bg-gray-800 transition mt-16">
    <div class="container py-8">
      <button
        type="button"
        class="h-10 w-10 flex items-center justify-center text-gray-600 dark:text-gray-200 transition"
        aria-label="Schimbă tema de culoare"
        @click.prevent="switchMode()"
      >
        <i v-if="isLight" class="gg-sun" />
        <i v-else class="gg-moon" />
      </button>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.gg-sun {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 24px;
  height: 24px;
  background: linear-gradient(to bottom, currentColor 4px, transparent 0)
      no-repeat 5px -6px/2px 6px,
    linear-gradient(to bottom, currentColor 4px, transparent 0) no-repeat 5px
      14px/2px 6px,
    linear-gradient(to bottom, currentColor 4px, transparent 0) no-repeat -8px 5px/6px
      2px,
    linear-gradient(to bottom, currentColor 4px, transparent 0) no-repeat 14px
      5px/6px 2px;
  border-radius: 100px;
  box-shadow: inset 0 0 0 2px;
  border: 6px solid transparent;
}

.gg-sun::after,
.gg-sun::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 24px;
  height: 2px;
  border-right: 4px solid;
  border-left: 4px solid;
  left: -6px;
  top: 5px;
}

.gg-sun::before {
  transform: rotate(-45deg);
}

.gg-sun::after {
  transform: rotate(45deg);
}

.gg-moon,
.gg-moon::after {
  display: block;
  box-sizing: border-box;
  border-radius: 50%;
}

.gg-moon {
  overflow: hidden;
  position: relative;
  transform: rotate(-135deg) scale(var(--ggs, 1));
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-bottom-color: transparent;
}

.gg-moon::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 18px;
  border: 2px solid transparent;
  box-shadow: 0 0 0 2px;
  top: 8px;
  left: 2px;
}
</style>
