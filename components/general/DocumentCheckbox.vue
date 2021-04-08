<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Card } from '@/components/ui/layout'

export default defineComponent({
  name: 'DocumentCheckbox',
  components: {
    Card
  },
  props: {
    text: { type: String, required: true }
  },
  setup () {
    const checked = ref<boolean>()

    return {
      checked
    }
  }
})
</script>

<template>
  <Card as="label" class="bg-gray-50 flex items-center">
    <input v-model="checked" type="checkbox" :name="text">

    <span>
      {{ text }}
    </span>
  </Card>
</template>
