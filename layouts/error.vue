<script lang="ts">
import { defineComponent, onMounted, PropType } from '@nuxtjs/composition-api'
import { Button } from '@/components/ui/forms'

interface Error {
  message: string
  statusCode: number
}

export default defineComponent({
  name: 'Error',
  components: {
    Button
  },
  props: {
    error: { type: Object as PropType<Error>, required: true }
  },
  setup () {
    onMounted(() => {
      window.scroll({
        top: 0
      })
    })

    return {}
  }
})
</script>

<template>
  <section v-if="error" class="container">
    <h1 class="text-4xl md:text-6xl lg:text-8xl font-hero tracking-tighter text-primary dark:text-white">
      Pagina aceasta nu există.
    </h1>

    <div class="flex items-start mt-8">
      <Button to="/" theme="secondary">
        Spre pagina principală
      </Button>
    </div>
  </section>
</template>
