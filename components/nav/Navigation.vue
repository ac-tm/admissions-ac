<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Logo, Logomark } from '@/components/logo'
import { Button } from '@/components/ui/forms'
import { Site } from '~/cms/types'

export default defineComponent({
  name: 'Navigation',
  components: {
    Logo,
    Logomark,
    Button
  },
  setup () {
    const { $content } = useContext()

    const cta = useAsync(async () => {
      const cfg = await $content('site').fetch<Site>()
      return Array.isArray(cfg) ? cfg[0]?.cta : cfg?.cta
    }, 'nav')

    return {
      cta
    }
  }
})
</script>

<template>
  <nav
    id="nav"
    :class="[
      'w-full h-16 top-0 left-0 z-50',
      'bg-white dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-50',
      'border-b border-gray-100 dark:border-gray-800 border-opacity-50 transition'
    ]"
  >
    <div class="container h-full flex justify-between">
      <nuxt-link to="/" title="Mergi pe pagina principală" class="h-full flex items-center">
        <Logo class="h-8 hidden md:block" />
        <Logomark class="h-8 md:hidden" />
      </nuxt-link>

      <Button v-if="cta" :to="cta.path" theme="secondary" class="self-center">
        {{ cta.label }}
      </Button>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
#nav {
  backdrop-filter: blur(15px);
}
</style>
