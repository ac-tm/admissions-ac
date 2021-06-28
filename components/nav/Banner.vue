<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { UPT, UPTShort } from '@/components/logo'

export default defineComponent({
  name: 'Banner',
  components: {
    UPT,
    UPTShort
  },
  setup() {
    return {}
  }
})
</script>

<template>
  <div id="banner" role="banner" class="bg-primary h-14">
    <div />

    <div class="pl-4 flex justify-between items-center h-full">
      <h1 class="text-sm lg:text-base font-medium text-white !leading-none">
        Admiterea la Facultatea de

        <br />

        <a
          href="https://ac.upt.ro"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline text-secondary"
        >
          Automatică și Calculatoare
        </a>
      </h1>

      <a
        href="https://upt.ro"
        target="_blank"
        rel="noopener noreferrer"
        class="h-full flex"
        title="Spre site-ul UPT"
      >
        <UPT class="h-full text-white hidden md:flex -mr-px" />

        <UPTShort class="h-full text-white flex md:hidden" />
      </a>
    </div>

    <div class="bg-white" />
  </div>
</template>

<style lang="postcss" scoped>
#banner {
  display: grid;
  grid-template-columns: 1fr min(1280px, 100%) 1fr;
}
</style>
