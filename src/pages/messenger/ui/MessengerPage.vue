<script setup lang="ts">
import { ServerListWidget, ChannelListWidget } from '@/widgets';

</script>

<template>
  <div class="messenger-page">
    <ServerListWidget class="server-list tile"></ServerListWidget>
    <ChannelListWidget class="channel-list tile"></ChannelListWidget>
  </div>
</template>

<style scoped>
.messenger-page {
  height: 100%;
  display: grid;
  grid-template-columns: 5rem 15rem 1fr;
  gap: var(--gap-size-xs);
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
  padding: var(--gap-size-s);
  display: flex;
  flex-flow: column nowrap;
}
</style>
