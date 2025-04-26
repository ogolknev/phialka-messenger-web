<script setup lang='ts'>
import { ServerTile } from '@/entities';
import { useServersStore } from '@/entities';
import { AddButton } from '@/shared';
import { onMounted } from 'vue';

const serversStore = useServersStore()

onMounted(() => {
  serversStore.updateServers()
})

</script>

<template>
  <div class="server-list">
    <AddButton class="add-server-button"></AddButton>
    <ServerTile v-for="server in serversStore.servers" :key="server.id" :server="server"></ServerTile>
  </div>
</template>

<style scoped>
.server-list {
  height: 100%;
  display: flex;
  padding: var(--gap-size-s);
  flex-flow: column nowrap;
  align-items: center;
  overflow-y: auto;
}

.add-server-button {
  width: 100%;
  aspect-ratio: 1;
}
</style>
