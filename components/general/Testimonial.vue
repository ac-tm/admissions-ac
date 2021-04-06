<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Card } from '@/components/ui/layout'

export default defineComponent({
  name: 'Testimonial',
  components: {
    Card
  },
  props: {
    message: { type: String, required: true },
    author: { type: String, required: true }
  }
})
</script>

<template>
  <Card as="blockquote" class="relative bg-primary min-h-64 flex flex-col justify-between">
    <span class="font-bold text-2xl leading-tight text-white mb-8">
      {{ message }}
    </span>
    <cite class="text-sm text-white opacity-75 not-italic">
      {{ author }}
    </cite>

    <svg width="74" viewBox="0 0 74 55" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 right-0 m-4">
      <path opacity="0.25" d="M17.7547 54.646C12.1773 54.646 7.90532 52.688 4.93866 48.772C2.09066 44.7373 0.666656 39.9907 0.666656 34.532C0.666656 27.1747 2.80266 20.3513 7.07466 14.062C11.4653 7.77267 16.924 3.08534 23.4507 0L33.9527 8.36601C29.206 10.2647 25.0527 12.9347 21.4927 16.376C17.9327 19.6987 15.5 23.1993 14.1947 26.878L15.0847 27.412C15.678 26.9373 16.39 26.5813 17.2207 26.344C18.0513 26.1067 19.238 25.988 20.7807 25.988C23.51 25.988 26.2393 27.1153 28.9687 29.37C31.8167 31.506 33.2407 34.8287 33.2407 39.338C33.2407 44.0847 31.698 47.8227 28.6127 50.552C25.5273 53.2813 21.908 54.646 17.7547 54.646ZM57.6267 54.646C52.0493 54.646 47.7773 52.688 44.8107 48.772C41.9627 44.7373 40.5387 39.9907 40.5387 34.532C40.5387 27.1747 42.6747 20.3513 46.9467 14.062C51.3373 7.77267 56.796 3.08534 63.3227 0L73.8247 8.36601C69.078 10.2647 64.9247 12.9347 61.3647 16.376C57.8047 19.6987 55.372 23.1993 54.0667 26.878L54.9567 27.412C55.55 26.9373 56.262 26.5813 57.0927 26.344C57.9233 26.1067 59.11 25.988 60.6527 25.988C63.382 25.988 66.1113 27.1153 68.8407 29.37C71.6887 31.506 73.1127 34.8287 73.1127 39.338C73.1127 44.0847 71.57 47.8227 68.4847 50.552C65.3993 53.2813 61.78 54.646 57.6267 54.646Z" fill="#F4F5FE" />
    </svg>
  </Card>
</template>
