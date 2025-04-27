<script setup lang='ts'>
import { ServerTile } from '@/entities';
import { useServersStore } from '@/entities';
import { AddButton } from '@/shared';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const serversStore = useServersStore()
const router = useRouter()

onMounted(() => {
  serversStore.updateServers()
})

</script>

<template>
  <div class="server-list">
    <AddButton @click="router.push('server-create')" class="add-server-button"></AddButton>
    <ServerTile v-for="server in serversStore.servers" class="server-tile"
      :class="{ selected: server.id === serversStore.selected?.id }" :key="server.id" :server="server"
      @click="() => serversStore.selectServer(server)"></ServerTile>
  </div>
</template>

<style scoped>
.add-server-button {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 1;
}

.server-tile:hover,
.server-tile.selected {
  border-color: var(--clr-accent);
}

.server-tile {
  cursor: pointer;
}
</style>
