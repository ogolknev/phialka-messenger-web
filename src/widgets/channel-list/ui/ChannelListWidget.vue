<script setup lang="ts">
import { ChannelCard, useChannelStore, useServerStore, type Channel } from '@/entities'
import { DefaultButton } from '@/shared'
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vue-router'

const channelStore = useChannelStore()
const serverStore = useServerStore()
const router = useRouter()
const contextMenuRef = useTemplateRef('context-menu')
const isContextMenuOpen = ref(false)
const contextMenuTargetChannel = ref<Channel | null>(null)
let updateIntervalId: number

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

function update() {
  if (!serverStore.selectedId) return
  channelStore.updateChannels(serverStore.selectedId)
}

watch(
  () => serverStore.selectedId,
  () => {
    channelStore.selectedId = ''
  },
)

onMounted(() => {
  update()
  updateIntervalId = setInterval(update, 5000)
  addEventListener('click', onClickGlobal)
})

onUnmounted(() => {
  clearInterval(updateIntervalId)
  removeEventListener('click', onClickGlobal)
})
</script>

<template>
  <div class="channel-list-widget">
    <ChannelCard
      v-for="channel in channelStore.channels"
      :key="channel.id"
      :channel="channel"
      class="channel-card"
      :class="{ selected: channelStore.selectedId === channel.id }"
      @click="() => channelStore.selectChannel(channel.id)"
      @contextmenu.prevent="
        (event) => {
          openContextMenu(event)
          contextMenuTargetChannel = channel
        }
      "
    ></ChannelCard>

    <Teleport v-if="isContextMenuOpen" to="#overlay">
      <div ref="context-menu" class="context-menu tile touchable">
        <DefaultButton
          @click="
            router.push({
              name: 'channel-edit',
              params: { id: contextMenuTargetChannel?.id },
            })
          "
        >
          Edit
        </DefaultButton>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.channel-card:hover,
.channel-card.selected {
  border-color: var(--clr-accent);
}

.channel-card {
  cursor: pointer;
}

.context-menu {
  position: fixed;
  padding: var(--gap-size-s);
}
</style>
