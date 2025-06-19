<template>
  <UIPopoverWrapper v-model="contextMenuOpen" side="right" align="start">
    <template #trigger>
      <div
        class="card aspect-square cursor-pointer p-2 hover:bg-neutral-800"
        :class="[
          cls,
          contextMenuOpen ? 'bg-neutral-800' : 'bg-neutral-900',
          serverStore.selectedId === server.id ? 'border-primary-500' : '',
        ]"
        @contextmenu.prevent="contextMenuOpen = !contextMenuOpen"
        @click.left="contextMenuOpen = false"
        @click="serverStore.selectServer(server.id)">
        <UIImage class="h-full" :src="server.photo?.url"></UIImage>
      </div>
    </template>

    <template #popover>
      <div class="card bg-neutral-900 p-2">
        <h3 class="m-2">{{ server.name }}</h3>
        <div class="mt-4 mb-2 h-[1px] bg-neutral-800"></div>
        <UIMenu
          :entries="[
            {
              text: 'Edit',
              icon: 'lucide:pen',
              callback: () => router.push(`/server/${server.id}/edit`),
            },
            { text: 'Remove', icon: 'lucide:trash', callback: onRemove },
          ]"></UIMenu>
      </div>
    </template>
  </UIPopoverWrapper>
</template>

<script setup lang="ts">
import UIImage from "@/shared/ui/image/UIImage.vue"
import { useServerStore, type Server } from "../model"
import { UIMenu, UIPopoverWrapper, useAPI } from "@/shared"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { deleteServer } from "@/features"

const router = useRouter()
const serverStore = useServerStore()

const contextMenuOpen = ref(false)
const { server, class: cls } = defineProps<{ server: Server; class?: string }>()

const deleteServerRequest = useAPI(deleteServer)
async function onRemove() {
  await deleteServerRequest.execute(server.id)
  contextMenuOpen.value = false
  serverStore.updateServers()
}
</script>
