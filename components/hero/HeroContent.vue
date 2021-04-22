<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Stack, Row } from '@/components/ui/layout'
import { Button } from '@/components/ui/forms'

import { Hero } from '~/cms/types'

export default defineComponent({
  name: 'HeroContent',
  components: {
    Stack,
    Row,
    Button
  },
  props: {
    hero: { type: Object as PropType<Hero>, required: true }
  },
  setup (props) {
    const canShowNotification = () => {
      if (!props.hero.notification) { return false }

      const today = new Date()
      const start = new Date(props.hero.notification.showAt)
      const end = new Date(props.hero.notification.hideAt)
      return today > start && today < end
    }

    return {
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
        :to="hero.notification.path + '/'"
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

    <Row v-if="!hero.comingSoon || !hero.comingSoon.show" flex>
      <Button :to="hero.cta.path + '/'" theme="primary" size="lg" class="mr-4 mb-4">
        {{ hero.cta.label }}
      </Button>
      <Button :to="hero.ctaSecondary.path + '/'" size="lg" class="!ml-0">
        {{ hero.ctaSecondary.label }}
      </Button>
    </Row>

    <Row v-else flex as="div" class="flex-row justify-start">
      <div class="flex items-center space-x-4 p-3 rounded-lg bg-primary dark:bg-secondary bg-opacity-75 font-bold !text-white">
        <i class="gg-info" />
        <p class="text-white">
          {{ hero.comingSoon.message }}
        </p>
      </div>
    </Row>
  </Stack>
</template>

<style lang="postcss">
.font-hero em {
  @apply text-secondary;
  @apply not-italic !important;
}

.gg-info {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs,1));
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-radius: 40px
}

.gg-info::after,
.gg-info::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  border-radius: 3px;
  width: 2px;
  background: currentColor;
  left: 7px
}

.gg-info::after {
  bottom: 2px;
  height: 8px
}

.gg-info::before {
  height: 2px;
  top: 2px
}
</style>
