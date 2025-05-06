<script setup lang="ts">
import { TextArea, AttachmentButton, DefaultButton } from '@/shared'
import { nextTick, ref } from 'vue'
import { sendChannelMessage } from '../api'
import { useChannelStore } from '@/entities'

const content = ref('')
const channelStore = useChannelStore()

async function onSend() {
  await sendChannelMessage({ channelId: channelStore.selectedId, body: { content: content.value } })
  content.value = ''
}

async function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLTextAreaElement
  if (event.key == 'Enter') {
    event.preventDefault()

    if (event.shiftKey) {
      const selectionStart = target.selectionStart
      const selectionEnd = target.selectionEnd
      const before = content.value.slice(0, selectionStart)
      const after = content.value.slice(selectionEnd)
      content.value = before + '\n' + after

      nextTick(() => {
        target.selectionEnd = target.selectionStart = selectionStart + 1
      })
      return
    }

    onSend()
  }
}
</script>

<template>
  <div class="message-input">
    <AttachmentButton class="attachment-button"></AttachmentButton>
    <TextArea v-model="content" class="textarea" @keydown="onKeydown"></TextArea>
    <DefaultButton class="send-button" @click="onSend">Send</DefaultButton>
  </div>
</template>

<style scoped>
.message-input {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 100%;
  gap: var(--gap-size-m);
}

.textarea {
  width: 100%;
  min-height: 100%;
}
.attachment-button,
.send-button {
  height: 100%;
}
</style>
