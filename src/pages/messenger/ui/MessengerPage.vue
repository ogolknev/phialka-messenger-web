<script setup lang="ts">
import { ServerListWidget, ChannelListWidget, MessageList } from '@/widgets'
import { AddButton } from '@/shared'
import { useRouter } from 'vue-router'
import { MessageInput } from '@/features'

const router = useRouter()
</script>

<template>
  <div class="messenger-page">
    <section class="server-list-section">
      <AddButton class="add-button" @click="router.push({ name: 'server-create' })"></AddButton>
      <ServerListWidget class="server-list tile"></ServerListWidget>
    </section>
    <section class="channel-list-section">
      <AddButton class="add-button" @click="router.push({ name: 'channel-create' })"></AddButton>
      <ChannelListWidget class="channel-list tile"></ChannelListWidget>
    </section>
    <section class="chat-section">
      <MessageList class="message-list"></MessageList>
      <MessageInput></MessageInput>
    </section>
  </div>
</template>

<style scoped>
.messenger-page {
  height: 100%;
  display: grid;
  grid-template-columns: 5rem 15rem 1fr;
  gap: var(--gap-size-xs);
}

section {
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-xs);
}

.chat-section {
  overflow-y: auto;
}

.add-button {
  height: 3rem;
}

.server-list {
  background: var(--clr-bg);
  height: 100%;
  padding: var(--gap-size-s);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
  align-items: center;
  overflow-y: auto;
}

.channel-list {
  height: 100%;
  padding: var(--gap-size-s);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
  overflow-y: auto;
}

.chat-section {
  display: grid;
  grid-template-rows: 1fr 4rem;
}

.message-list {
  padding-inline: 10%;
}
</style>
