<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { lightFormat } from 'date-fns'
import Attachment from '../Attachment.vue'
import { TimelineEvent } from '~/cms/types'
import { Stack } from '~/components/ui/layout'
// import ro from 'date-fns/locale/ro'

export default defineComponent({
  name: 'TimelineEvent',
  // eslint-disable-next-line vue/no-unused-components
  components: { Stack, Attachment },
  props: {
    event: { type: Object as PropType<TimelineEvent>, required: true },
    isLast: { type: Boolean, default: false }
  },
  setup(props) {
    type EventState = 'before' | 'during' | 'done'
    const eventState = computed<EventState>(() => {
      const now = new Date()
      if (now < new Date(props.event.date)) {
        return 'before'
      }
      if (!props.event.deadline) {
        return 'done'
      }
      if (now > new Date(props.event.deadline)) {
        return 'done'
      }
      return 'during'
    })

    const formattedStart = computed(() =>
      lightFormat(new Date(props.event.date), "d.MM.yyyy 'la' HH:mm")
    )
    const formattedDeadline = computed(() =>
      props.event.deadline
        ? lightFormat(new Date(props.event.deadline), "d.MM.yyyy 'la' HH:mm")
        : undefined
    )

    return {
      eventState,
      formattedStart,
      formattedDeadline
    }
  }
})
</script>

<template>
  <div class="timeline-event space-x-4 w-full">
    <Stack flex class="items-center">
      <div
        :class="[
          'w-[42px] h-[42px]',
          'flex items-center justify-center',
          'rounded-full border-2',
          eventState === 'before' && 'border-gray-200 dark:border-gray-500',
          eventState === 'during' && 'border-secondary dark:border-gray-200',
          eventState === 'done' &&
            'border-primary dark:border-secondary text-primary dark:text-secondary'
        ]"
      >
        <span
          v-if="eventState === 'during'"
          class="w-2 h-2 rounded-full bg-secondary dark:bg-gray-200"
        />
        <span v-if="eventState === 'done'">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>

      <div
        v-if="!isLast"
        class="flex-1 w-0.5 !mt-0 !pt-0"
        :class="[
          eventState === 'before' && 'bg-gray-200',
          eventState === 'during' && 'bg-secondary dark:bg-gray-500',
          eventState === 'done' && 'bg-primary dark:bg-secondary'
        ]"
      />
    </Stack>

    <Stack class="flex-1">
      <h2
        class="
          !text-lg
          !font-bold
          !tracking-normal
          !text-gray-800
          dark:!text-white
          !my-0
          !mt-0
        "
      >
        {{ event.title }}
      </h2>
      <p
        class="
          font-bold
          text-sm
          !text-gray-700
          dark:!text-gray-200
          !-mt-1
          !mb-0
        "
      >
        <time>{{ formattedStart }}</time>
        <span v-if="formattedDeadline">
          — <time> {{ formattedDeadline }} </time>
        </span>
      </p>

      <div class="mt-4 pb-8 w-full">
        <NuxtContent
          v-if="event.details"
          class="prose"
          :document="event.body"
        />
      </div>
    </Stack>
  </div>
</template>

<style scoped>
.timeline-event {
  display: grid;
  grid-template-columns: 42px 1fr;
}

.gg-check {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px;
}
.gg-check::after {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: 3px;
  top: -1px;
  width: 6px;
  height: 10px;
  border-width: 0 2px 2px 0;
  border-style: solid;
  transform-origin: bottom left;
  transform: rotate(45deg);
}
</style>
