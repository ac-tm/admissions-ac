<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { Stack, Row } from '@/components/ui/layout'

export default defineComponent({
  name: 'HeroContent',
  components: {
    Stack,
    Row,
  },
  setup() {
    const data = reactive({
      title: 'Nicăieri nu e ca la AC. Nici măcar acasă.',
      subtitle:
        'Învață, pune în practică, inovează – cei trei pași ai succesului la Automatică și Calculatoare. Fără AC viața nu are sens.',
      primaryAction: {
        label: 'Vreau să mă înscriu!',
        to: '/',
      },
      secondaryAction: {
        label: 'De ce AC?',
        to: '/',
      },
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<template>
  <Stack flex space="lg">
    <h1
      :class="[
        'max-w-[10ch]',
        'text-4xl md:text-6xl lg:text-8xl',
        'font-hero text-primary tracking-tighter leading-none',
      ]"
    >
      {{ title }}
    </h1>

    <p class="max-w-[40ch] text-base sm:text-lg text-gray-700">
      {{ subtitle }}
    </p>

    <Row flex>
      <nuxt-link :to="primaryAction.to">
        {{ primaryAction.label }}
      </nuxt-link>
      <nuxt-link :to="primaryAction.to">
        {{ secondaryAction.label }}
      </nuxt-link>
    </Row>
  </Stack>
</template>
