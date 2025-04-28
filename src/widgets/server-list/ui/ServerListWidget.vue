<script setup lang='ts'>
import { Server, ServerTile } from '@/entities';
import { useServerStore } from '@/entities';
import { AddButton, DefaultButton } from '@/shared';
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const serversStore = useServerStore()
const router = useRouter()
const contextMenuRef = useTemplateRef('context-menu')
const isContextMenuOpen = ref(false)
const contextMenuTargetServer = ref<Server | null>(null)

function openContextMenu(event: MouseEvent) {
  isContextMenuOpen.value = true

  nextTick(() => {
    if (!contextMenuRef.value) return
    contextMenuRef.value.style.top = event.clientY + 'px'
    contextMenuRef.value.style.left = event.clientX + 'px'
  })
}

function onClickGlobal(event: MouseEvent) {
  if ((event.target as HTMLElement).closest('.context-menu')) return
  isContextMenuOpen.value = false
}

onMounted(() => {
  serversStore.updateServers()
  addEventListener('click', onClickGlobal)
})

onUnmounted(() => {
  removeEventListener('click', onClickGlobal)
})

</script>

<template>
  <div class="server-list-widget">
    <AddButton @click="router.push({ name: 'server-create' })" class="add-server-button"></AddButton>
    <ServerTile v-for="server in serversStore.servers" class="server-tile"
      :class="{ selected: server.id === serversStore.selectedId }" :key="server.id" :server="server"
      @click="() => serversStore.selectServer(server.id)"
      @contextmenu.prevent="(event) => { openContextMenu(event); contextMenuTargetServer = server }">
    </ServerTile>

    <Teleport v-if="isContextMenuOpen" to="#overlay">
      <div ref="context-menu" class="context-menu tile touchable">
        <DefaultButton @click="router.push({ name: 'server-edit', params: { id: contextMenuTargetServer?.id } })">Edit
        </DefaultButton>
      </div>
    </Teleport>
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

.context-menu {
  position: fixed;
  padding: var(--gap-size-s);
}
</style>
