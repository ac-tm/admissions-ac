<script lang="ts">
import { defineComponent, onMounted, ref, useContext, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DocumentCheckbox',
  props: {
    text: { type: String, required: true }
  },
  setup (props) {
    const checked = ref<boolean>()
    const { params } = useContext()

    watch(checked, (val) => {
      localStorage.setItem(params.value?.pathMatch + props.text, val + '')
    })

    onMounted(() => {
      const initial = localStorage.getItem(params.value?.pathMatch + props.text)
      if (initial === 'true') {
        checked.value = true
      }
    })

    return {
      checked
    }
  }
})
</script>

<template>
  <label
    class="bg-gray-50 dark:bg-gray-800 flex items-center rounded-lg px-4 py-4 mb-4 group focus-within:ring transition cursor-pointer border-2"
    :class="checked ? 'border-primary' : 'border-transparent'"
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
        'flex items-center justify-center pointer-events-none',
        'rounded border-2 transition',
        'group-hover:border-primary dark:group-hover:border-gray-600',
        checked && 'border-primary dark:border-secondary group-hover:border-primary',
      ]"
      @click="() => checked = !checked"
    >
      <div class="h-2 w-2 rounded-[1px] transition" :class="checked && 'bg-primary dark:bg-secondary'" />
    </div>

    <span class="flex-1 select-none">
      {{ text }}
    </span>
  </label>
</template>
