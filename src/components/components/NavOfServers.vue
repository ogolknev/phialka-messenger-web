<script setup lang="ts">
import ButtonAdd from '../elements/ButtonAdd.vue'
import ThumbnailDefault from '../elements/ThumbnailDefault.vue'
import ButtonDefault from '../elements/ButtonDefault.vue'

import { onBeforeUnmount, onMounted, ref } from 'vue'

const { servers = [], selectedServerId } = defineProps<{
  servers: API.Server[]
  selectedServerId: string | null
}>()
const emit = defineEmits<{
  (ev: 'click-create-server'): void
  (ev: 'click-edit-server', serverId: string): void
  (ev: 'click-server', serverId: string): void
}>()

const serverContextMenu = ref<{
  left: number
  top: number
  title: string
  id: string
} | null>(null)
let longPressTimer: number | undefined

function onClickCreateServer() {
  emit('click-create-server')
}

function onClickServer(serverId: string) {
  emit('click-server', serverId)
  console.log('works?')
}

function getIconSrc(downloadId?: string) {
  if (downloadId) return import.meta.env.VITE_API_BASE_URL + '/files/download/' + downloadId
  return undefined
}

function openServerContextMenu(
  event: MouseEvent | TouchEvent,
  serverTitle: string,
  serverId: string,
) {
  serverContextMenu.value = {
    left: 'clientX' in event ? event.clientX : event.touches[0].clientX,
    top: 'clientY' in event ? event.clientY : event.touches[0].clientY,
    title: serverTitle,
    id: serverId,
  }
}

function closeServerContextMenu(event: MouseEvent | TouchEvent) {
  if (
    (event.target as HTMLDivElement).style.left !== serverContextMenu.value?.left + 'px' ||
    (event.target as HTMLDivElement).style.top !== serverContextMenu.value?.top + 'px'
  ) {
    serverContextMenu.value = null
  }
}

function onClickEditServer() {
  emit('click-edit-server', serverContextMenu.value!.id)
}

function startLongPress(event: TouchEvent, serverTitle: string, serverId: string) {
  if (longPressTimer === undefined) {
    longPressTimer = setTimeout(() => {
      navigator.vibrate?.(30)
      openServerContextMenu(event, serverTitle, serverId)
      longPressTimer = undefined
    }, 300)
  }
}

function cancelLongPress(event: TouchEvent) {
  if (longPressTimer !== undefined) {
    ;(event.target as HTMLElement).click?.()
    clearTimeout(longPressTimer)
    longPressTimer = undefined
  }
}

onMounted(() => {
  addEventListener('click', closeServerContextMenu)
})

onBeforeUnmount(() => {
  removeEventListener('click', closeServerContextMenu)
})
</script>

<template>
  <div class="nav-of-servers">
    <ButtonAdd @click="onClickCreateServer" color="success"></ButtonAdd>
    <div class="servers-container">
      <div
        v-for="server in servers"
        :key="server.server_id"
        class="tile server-list-entry"
        :class="{ selected: selectedServerId === server.server_id }"
        @click="() => onClickServer(server.server_id)"
        @click.right.prevent="
          (event) => openServerContextMenu(event, server.title, server.server_id)
        "
        @touchstart.prevent="(event) => startLongPress(event, server.title, server.server_id)"
        @touchcancel.prevent="cancelLongPress"
        @touchend.prevent="cancelLongPress"
      >
        <ThumbnailDefault :src="getIconSrc(server.logo?.download_id)"></ThumbnailDefault>
      </div>
    </div>
  </div>
  <teleport v-if="serverContextMenu" to=".app-overlay">
    <div
      class="tile server-context-menu"
      :style="{
        position: 'absolute',
        left: serverContextMenu.left + 'px',
        top: serverContextMenu.top + 'px',
      }"
    >
      <span class="title">{{ serverContextMenu.title }}</span>
      <ButtonDefault color="warning" @click="onClickEditServer">Edit</ButtonDefault>
    </div>
  </teleport>
</template>

<style scoped>
.nav-of-servers {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: var(--gap);
  overflow: hidden;
}

.servers-container {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap);
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.server-list-entry {
  flex-shrink: 0;
  transition: border-color var(--anim-fade);
  cursor: pointer;
}

.server-list-entry.selected {
  border-color: var(--accent-0);
}

.server-context-menu {
  width: calc(var(--tile-size) * 3);
  height: fit-content;
  padding: var(--gap);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: var(--gap);

  .title {
    font-size: var(--text-m);
    pointer-events: none;
  }

  .button-element {
    width: 100%;
  }
}
</style>
