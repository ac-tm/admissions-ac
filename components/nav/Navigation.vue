<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Logo } from '@/components/logo'

export default defineComponent({
  name: 'Navigation',
  components: {
    Logo,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <nav
    id="nav"
    class="w-full h-16 fixed top-0 left-0 bg-white bg-opacity-75 border-b border-gray-100 border-opacity-50"
  >
    <div class="container h-full flex justify-between">
      <nuxt-link to="/" title="Mergi pe pagina principală" class="h-full flex">
        <Logo class="h-10 self-center" />
      </nuxt-link>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
#nav {
  backdrop-filter: blur(15px);
}
</style>
