<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Card } from '@/components/ui/layout'

export default defineComponent({
  name: 'Specializations',
  components: {
    Card
  },
  setup () {
    return {}
  }
})
</script>

<template>
  <Card as="section" class="bg-gray-50" size="lg">
    <h2>
      This is a title
    </h2>
  </Card>
</template>
