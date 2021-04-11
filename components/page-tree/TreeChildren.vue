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
  components: { Tree: () => import('./Tree.vue') },
  props: {
    children: { type: Object as PropType<TreeNode[]>, required: true }
  },
  setup () {
    return {}
  }
})
</script>

<template>
  <ul>
    <li v-for="child in children" :key="child.page.title">
      <Tree v-if="child.children" :tree="child" />

      <span v-else>{{ child.page.title }}</span>
    </li>
  </ul>
</template>
