<script setup lang="ts">
import { MessageCard, useChannelStore } from '@/entities'
import { useChannelMessagesStore } from '@/entities/channel/model/channel-messages-store'
import { nextTick, onMounted, onUnmounted, useTemplateRef, watch } from 'vue'

const messageListRef = useTemplateRef('message-list')
const channelMessagesStore = useChannelMessagesStore()
const channelStore = useChannelStore()
let loadNewMessagesIntervalId: number

async function updateMessages() {
  await channelMessagesStore.loadMessages(channelStore.selectedId)
}

async function loadOldMessages() {
  const messageList = messageListRef.value
  if (!messageList) return

  const previousHeight = messageList.scrollHeight
  const previousScrollTop = messageList.scrollTop

  await channelMessagesStore.loadOldMessages(channelStore.selectedId)
  await nextTick()
  const newHeight = messageList.scrollHeight
  messageList.scrollTop = previousScrollTop + (newHeight - previousHeight)
}

async function loadNewMessages() {
  const loadedMessagesCount = await channelMessagesStore.loadNewMessages(channelStore.selectedId)
  if (loadedMessagesCount) {
    console.log({ loadedMessagesCount })
    await nextTick()
    scrollToBottom()
  }
}

async function onScroll() {
  const SCROLL_THRESHOLD = 300

  const messageList = messageListRef.value
  if (!messageList) return
  if (messageList.scrollTop <= SCROLL_THRESHOLD) {
    await loadOldMessages()
  }
}

async function scrollToBottom() {
  await nextTick()
  const messageList = messageListRef.value
  if (messageList) messageList.scrollTop = messageList.scrollHeight
}

watch(
  () => channelStore.selectedId,
  async () => {
    await updateMessages()
    await nextTick()
    scrollToBottom()
  },
)

watch(
  () => channelMessagesStore.lastMessages[channelStore.selectedId]?.sequence,
  async (newValue, prevValue) => {
    console.log({ newValue, prevValue })
    if (newValue !== prevValue) {
      await nextTick()
      scrollToBottom()
    }
  },
)

onMounted(async () => {
  loadNewMessagesIntervalId = setInterval(loadNewMessages, 2000)
  await nextTick()
  scrollToBottom()
})
onUnmounted(() => {
  clearInterval(loadNewMessagesIntervalId)
})
</script>

<template>
  <div ref="message-list" class="message-list" @scroll="onScroll">
    <MessageCard
      v-for="message in channelMessagesStore.messages[channelStore.selectedId]"
      :key="message.id"
      :message="message"
    ></MessageCard>
  </div>
</template>

<style scoped>
.message-list {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-xs);
  overflow-y: scroll;
}

.message-card.own {
  align-self: end;
}
</style>
