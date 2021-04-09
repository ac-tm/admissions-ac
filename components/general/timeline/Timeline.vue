<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Stack } from '@/components/ui/layout'
import TimelineEvent from './TimelineEvent.vue'
import { Timeline } from '~/cms/types'

export default defineComponent({
  name: 'Timeline',
  components: {
    Stack,
    TimelineEvent
  },
  props: {
    slug: { type: String, required: true }
  },
  setup (props) {
    const { $content } = useContext()

    const timeline = useAsync(async () => {
      const result = await $content('timelines', props.slug).fetch<Timeline>()
      return Array.isArray(result) ? result[0] : result
    }, 'timeline' + props.slug)

    return { timeline }
  }
})
</script>

<template>
  <Stack v-if="timeline" as="section" class="my-16 !space-y-0">
    <TimelineEvent
      v-for="(event, idx) of timeline.events"
      :key="event.title"
      :event="event"
      :is-last="idx === timeline.events.length - 1"
    />
  </Stack>
</template>
