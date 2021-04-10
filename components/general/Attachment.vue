<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Attachment',
  props: {
    label: { type: String, required: true },
    internal: { type: String, default: undefined },
    external: { type: String, default: undefined },
    file: { type: String, default: undefined }
  },
  setup (props) {
    const internal = {
      is: 'nuxt-link',
      to: props.internal
    }

    const external = {
      is: 'a',
      href: props.external || props.file,
      target: '_blank',
      rel: 'noopener noreferrer'
    }

    return {
      attrs: props.internal ? internal : external
    }
  }
})
</script>

<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component
    v-bind="attrs"
    :class="[
      'rounded-lg min-h-12 mt-4 py-3 w-full !max-w-full flex items-center justify-evenly',
      '!text-gray-800 dark:!text-white',
      'bg-gray-100 bg-opacity-50 dark:bg-gray-800 transition',
      'hover:bg-gray-100 dark:hover:bg-gray-700'
    ]"
  >
    <div class="h-full w-12 min-w-[12] flex items-center justify-center">
      <i :class="file ? 'gg-file-document' : 'gg-link'" />
    </div>

    <div class="inline flex-1">
      <span class="!no-underline w-1/3 font-medium">
        {{ label }}
      </span>
    </div>

    <div class="h-full w-12 min-w-[12] flex items-center justify-center justify-senf-end">
      <i class="gg-arrow-right" />
    </div>
  </component>
</template>

<style lang="postcss" scoped>
.gg-link {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: rotate(-45deg) scale(var(--ggs, 1));
  width: 8px;
  height: 2px;
  background: currentColor;
  border-radius: 4px;
}

.gg-link::after,
.gg-link::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  border-radius: 3px;
  width: 8px;
  height: 10px;
  border: 2px solid;
  top: -4px;
}

.gg-link::before {
  border-right: 0;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  left: -6px;
}

.gg-link::after {
  border-left: 0;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  right: -6px;
}

.gg-file-document {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 14px;
  height: 16px;
  border: 2px solid transparent;
  border-right: 0;
  border-top: 0;
  box-shadow: 0 0 0 2px;
  border-radius: 1px;
  border-top-right-radius: 4px;
  overflow: hidden;
}

.gg-file-document::after,
.gg-file-document::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
}

.gg-file-document::before {
  background: currentColor;
  box-shadow: 0 4px 0, -6px -4px 0;
  left: 0;
  width: 10px;
  height: 2px;
  top: 8px;
}

.gg-file-document::after {
  width: 6px;
  height: 6px;
  border-left: 2px solid;
  border-bottom: 2px solid;
  right: -1px;
  top: -1px;
}
</style>
