<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IContentDocument } from '@nuxt/content/types/content'
import { Page } from '~/cms/types'

type ContentPage = IContentDocument & Page

interface TreeNode {
  page: Pick<ContentPage, 'title' | 'fullPath'>
  children: TreeNode[] | null
}

export default defineComponent({
  name: 'Tree',
  props: {
    tree: { type: Array as PropType<TreeNode[]>, required: true }
  },
  setup () {
    return {}
  }
})
</script>

<template>
  <ul class="list-inside dark:text-white">
    <li
      v-for="node of tree"
      :key="node.page.fullPath"
      :class="node.children && 'mt-4'"
    >
      <nuxt-link
        :to="'/' + node.page.fullPath + '/'"
        class="hover:underline flex items-center leading-tight py-1"
        :class="node.children ? 'font-bold' : ''"
      >
        <i v-if="node.children" class="gg-chevron-down text-gray-300 dark:text-gray-600 mr-[0.4rem]" />
        {{ node.page.title }}
      </nuxt-link>

      <div v-if="node.children" class="ml-[0.65rem] pl-4 mt-1 mb-4 border-l-2 border-gray-300 dark:border-gray-600">
        <component :is="'tree'" :tree="node.children" />
      </div>
    </li>
  </ul>
</template>

<style lang="postcss" scoped>
 .gg-chevron-down {
 box-sizing: border-box;
 position: relative;
 display: block;
 transform: scale(var(--ggs,1));
 width: 22px;
 height: 22px;
 border: 2px solid transparent;
 border-radius: 100px
}

.gg-chevron-down::after {
 content: "";
 display: block;
 box-sizing: border-box;
 position: absolute;
 width: 10px;
 height: 10px;
 border-bottom: 2px solid;
 border-right: 2px solid;
 transform: rotate(45deg);
 left: 4px;
 top: 2px
}
</style>
