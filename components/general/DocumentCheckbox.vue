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
  <label
    class="bg-gray-50 dark:bg-gray-800 flex items-center rounded-lg px-4 py-4 mb-4 group focus-within:ring transition"
  >
    <input
      v-model="checked"
      :name="text"
      type="checkbox"
      class="appearance-none"
    >
    <div
      :class="[
        'h-4 w-4 mr-4',
        'flex items-center justify-center',
        'rounded border-2 transition',
        'group-hover:border-white dark:group-hover:border-gray-600',
        checked && 'border-primary dark:border-secondary',
      ]"
      @click="() => checked = !checked"
    >
      <div class="h-2 w-2 rounded-[1px] transition" :class="checked && 'bg-primary dark:bg-secondary'" />
    </div>

    <span>
      {{ text }}
    </span>
  </label>
</template>
