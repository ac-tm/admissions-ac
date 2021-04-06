<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Testimonial } from '@/components/general'
import { Testimonial as TestimonialT } from '~/cms/types'

export default defineComponent({
  name: 'Testimonials',
  components: {
    Testimonial
  },
  setup () {
    const { $content } = useContext()

    const testimonials = useAsync(async () => {
      return await $content('testimonials').fetch<TestimonialT>()
    }, 'testimonials')

    return {
      testimonials
    }
  }
})
</script>

<template>
  <section v-if="testimonials" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <Testimonial v-for="(testimonial, idx) of testimonials" :key="idx" :author="testimonial.author" :message="testimonial.message" />
  </section>
</template>
