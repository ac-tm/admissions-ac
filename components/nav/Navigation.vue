<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  computed
} from '@nuxtjs/composition-api'
import { Button } from '@/components/ui/forms'
import { Logo, Logomark } from '@/components/logo'
import { Site } from '~/cms/types'

export default defineComponent({
  name: 'Navigation',
  components: {
    Button,
    Logo,
    Logomark
  },
  setup () {
    const { $content, route } = useContext()

    const cta = useAsync(async () => {
      const cfg = await $content('site').fetch<Site>()

      return Array.isArray(cfg) ? cfg[0]?.cta : cfg?.cta
    }, 'nav')

    const homePath = computed(() => {
      if (route.value.path.startsWith('/master/')) {
        return '/master/'
      }
      if (route.value.path.startsWith('/licenta/')) {
        return '/licenta/'
      }
      return '/'
    })

    return {
      cta,
      homePath
    }
  }
})
</script>

<template>
  <nav
    id="nav"
    :class="[
      'w-full h-14 md:h-16 top-0 left-0 z-50',
      'bg-white dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-50',
      'border-b border-gray-100 dark:border-gray-800 border-opacity-50 transition'
    ]"
  >
    <div class="container h-full grid grid-cols-3">
      <div v-if="cta" class="place-self-start h-full flex items-center">
        <nuxt-link
          :to="homePath"
          title="Mergi pe pagina principală"
          class="h-full flex items-center pr-2 text-primary dark:text-white"
        >
          <i class="gg-home text-lx" />
        </nuxt-link>
      </div>

      <div
        class="h-full flex items-center place-self-center"
      >
        <Logo aria-hidden role="presentation" class="h-8 hidden md:block" />
        <Logomark aria-hidden role="presentation" class="h-6 md:hidden" />
      </div>

      <div v-if="cta" class="place-self-end h-full flex items-center ">
        <Button :to="cta.path" theme="secondary" size="sm">
          {{ cta.label }}
        </Button>
      </div>
    </div>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
#nav {
  backdrop-filter: blur(15px);
}

.gg-home {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 18px;
  height: 14px;
  border: 2px solid;
  border-top: 0;
  border-radius: 2px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  margin-bottom: -2px;
}
.gg-home::after,
.gg-home::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
}
.gg-home::before {
  border-top: 2px solid;
  border-left: 2px solid;
  border-top-left-radius: 4px;
  transform: rotate(45deg);
  top: -5px;
  border-radius: 3px;
  width: 14px;
  height: 14px;
  left: 0;
}
.gg-home::after {
  width: 6px;
  height: 10px;
  background: currentColor;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  left: 4px;
  bottom: -2px;
}
</style>
