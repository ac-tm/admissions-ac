<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Stack, Row } from '@/components/ui/layout'
import { Button } from '@/components/ui/forms'

import { IContentDocument } from '@nuxt/content/types/content'
import { Hero } from '~/cms/types'

export default defineComponent({
  name: 'HeroContent',
  components: {
    Stack,
    Row,
    Button
  },
  setup () {
    const { $content } = useContext()

    const hero = useAsync(async () => {
      const result = await $content('hero').fetch<Hero>() as (Hero & IContentDocument)

      return result
    }, 'hero')
    const canShowNotification = () => {
      if (!hero.value?.notification) { return false }

      const today = new Date()
      const start = new Date(hero.value.notification.showAt)
      const end = new Date(hero.value.notification.hideAt)
      return today > start && today < end
    }

    return {
      hero,
      canShowNotification
    }
  }
})
</script>

<template>
  <Stack v-if="hero" space="lg">
    <Row flex>
      <Button
        v-if="hero.notification && canShowNotification()"
        :to="hero.notification.path"
        theme="secondary"
        size="sm"
        rounded
      >
        {{ hero.notification.label }}

        <i class="gg-arrow-right ml-2" />
      </Button>
    </Row>

    <h1
      :class="[
        'max-w-[10ch]',
        'font-hero text-5xl md:text-6xl lg:text-8xl',
        'text-primary dark:text-gray-100 tracking-tighter leading-none transition',
      ]"
      v-html="hero.title"
    />

    <p class="max-w-[40ch] text-base sm:text-lg text-gray-700 dark:text-gray-100 transition">
      {{ hero.copy }}
    </p>

    <Row flex>
      <Button :to="hero.cta.path" theme="primary" size="lg">
        {{ hero.cta.label }}
      </Button>
      <Button :to="hero.ctaSecondary.path" size="lg">
        {{ hero.ctaSecondary.label }}
      </Button>
    </Row>
  </Stack>
</template>

<style lang="postcss">
.font-hero em {
  @apply text-secondary;
  @apply not-italic !important;
}
</style>
