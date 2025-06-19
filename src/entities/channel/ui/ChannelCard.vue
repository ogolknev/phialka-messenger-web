<template>
  <UIPopoverWrapper v-model="contextMenuOpen" side="right" align="start">
    <template #trigger>
      <div
        @contextmenu.prevent="contextMenuOpen = !contextMenuOpen"
        @click="
          () => {
            channelStore.selectChannel(channel.id)
            contextMenuOpen = false
          }
        "
        class="grid cursor-pointer grid-cols-[auto_1fr] grid-rows-[auto_1fr]
          gap-2 rounded-lg border p-2 hover:bg-neutral-800"
        :class="[
          contextMenuOpen ? 'bg-neutral-800' : 'bg-neutral-900',
          channelStore.selectedId === channel.id
            ? 'border-primary-500'
            : 'border-transparent',
        ]">
        <UIImage
          class="row-start-1 row-end-3 aspect-square size-8"
          :src="channel?.photo?.url"></UIImage>

        <div class="h-4">
          <span v-if="channel?.name">{{ channel?.name }}</span>
          <UISkeleton v-else></UISkeleton>
        </div>

        <div class="h-8">
          <UISkeleton></UISkeleton>
        </div>
      </div>
    </template>

    <template #popover>
      <div class="card bg-neutral-900 p-2">
        <h3 class="m-2">{{ channel?.name }}</h3>
        <div class="mt-4 mb-2 h-[1px] bg-neutral-800"></div>
        <UIMenu
          :entries="[
            { text: 'Edit', icon: 'lucide:pen' },
            { text: 'Remove', icon: 'lucide:trash' },
          ]"></UIMenu>
      </div>
    </template>
  </UIPopoverWrapper>
</template>

<script setup lang="ts">
import { UIPopoverWrapper, UISkeleton } from "@/shared"
import { useChannelStore, type Channel } from "../model"
import UIImage from "@/shared/ui/image/UIImage.vue"
import { ref } from "vue"
import UIMenu from "@/shared/ui/menu/ui/UIMenu.vue"

const contextMenuOpen = ref(false)

const channelStore = useChannelStore()

const { channel } = defineProps<{ channel: Channel }>()
</script>
