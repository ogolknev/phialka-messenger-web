<template>
  <div class="grid h-full grid-cols-[auto_1fr_3fr] gap-2">
    <div
      ref="server-panel"
      class="grid grid-rows-[auto_minmax(0,1fr)] gap-2 overflow-hidden">
      <UIButton
        class="text-xl"
        icon="lucide:plus"
        color="primary"
        variant="outline"
        to="/server/create"></UIButton>

      <div
        class="scrollbar-hidden flex flex-col gap-1 overflow-auto scroll-smooth">
        <template v-for="server in serverStore.servers" :key="server.id">
          <ServerBubble class="size-12" :server></ServerBubble>
        </template>
      </div>
    </div>

    <div
      ref="chat-list-panel"
      class="scrollbar-hidden relative overflow-hidden">
      <div
        class="card scrollbar-hidden h-full overflow-auto scroll-smooth
          bg-neutral-900 p-2">
        <template v-if="serverStore.selectedId">
          <template
            v-for="(channel, index) in channelStore.channelsMap[
              serverStore.selectedId
            ]"
            :key="channel.id">
            <ChannelCard
              class="w-full overflow-hidden"
              :class="[
                index === 0 ? 'rounded-t-lg' : '',
                index === channelStore.channels.length - 1
                  ? 'rounded-b-lg'
                  : '',
              ]"
              :channel></ChannelCard>

            <div
              v-if="index !== channelStore.channels.length - 1"
              class="my-2 h-[1px] bg-neutral-800"></div>
          </template>
        </template>
      </div>

      <UIButton
        v-if="serverStore.selectedId"
        class="absolute right-1 bottom-1 p-3"
        icon="lucide:pen"
        color="primary"
        @click="
          () => router.push(`/server/${serverStore.selectedId}/channel/create`)
        "></UIButton>
    </div>

    <div class="chat grid grid-rows-[auto_1fr_auto] gap-2 overflow-hidden">
      <header
        class="card grid h-12 grid-cols-[auto_1fr_auto] items-center gap-2
          bg-neutral-900 px-2">
        <UIImage class="aspect-square size-8"></UIImage>
        <span class="h-8">
          <UISkeleton></UISkeleton>
        </span>
        <UIButton
          class="text-sm"
          icon="lucide:x"
          color="error"
          variant="soft"></UIButton>
      </header>
      <div class="overflow-hidden">
        <UIInfiniteScroll
          class="h-full"
          :load-start-data="loadOldMessages"
          :load-end-data="loadNewMessages"
          :clean-end-data="() => (messages = messages.slice(0, 159))"
          :clean-start-data="() => (messages = messages.slice(-160))">
          <div class="flex flex-col gap-2">
            <template v-for="message in messages" :key="message.id">
              <MessageBubble class="size-fit" :message></MessageBubble>
            </template>
          </div>
        </UIInfiniteScroll>
      </div>
      <footer
        class="card grid grid-cols-[auto_1fr_auto] grid-rows-[1fr] items-start
          gap-2 bg-neutral-900 p-2">
        <UIButton
          class="p-3.5 text-sm"
          icon="lucide:paperclip"
          variant="soft"></UIButton>

        <UITextarea :max-rows="5" color="primary"></UITextarea>

        <UIButton
          class="p-3.5 text-sm"
          icon="lucide:send-horizontal"
          variant="soft"
          color="primary"></UIButton>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import {
  ChannelCard,
  MessageBubble,
  ServerBubble,
  useChannelStore,
  useProfileStore,
  useServerStore,
  type Message,
} from "@/entities"
import {
  apiClient,
  UIImage,
  UIInfiniteScroll,
  UISkeleton,
  UITextarea,
} from "@/shared"
import UIButton from "@/shared/ui/button/ui/UIButton.vue"
import { useRouter } from "vue-router"

const router = useRouter()
const profileStore = useProfileStore()
const serverStore = useServerStore()
const channelStore = useChannelStore()

const messages = ref<Message[]>([])

async function loadNewMessages() {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      const start = messages.value[messages.value.length - 1].sequence + 1
      const end = start + 30
      for (let i = start; i < end; i++) {
        messages.value.push({
          id: i.toString(),
          sequence: i,
          authorId: i.toString(),
          content: "hello, its message number " + i,
          channelId: "0",
          attachments: [],
          replyId: undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
      resolve()
    }, 5000),
  )
}

async function loadOldMessages() {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      const start = messages.value[0].sequence - 1
      const end = start - 30
      for (let i = start; i >= end; i--) {
        messages.value.unshift({
          id: i.toString(),
          sequence: i,
          content: "hello, its message number " + i,
          authorId: i.toString(),
          channelId: "0",
          attachments: [],
          replyId: undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
      resolve()
    }, 5000),
  )
}

onMounted(async () => {
  const { response } = await apiClient.GET("/auth/refresh")
  if (response.status === 403) router.push("/login")

  await profileStore.updateProfile()
  await serverStore.updateServers()
  await channelStore.updateChannels(
    serverStore.servers.map((server) => server.id),
  )

  for (let i = 0; i <= 30; i++) {
    messages.value.push({
      id: i.toString(),
      sequence: i,
      content: "hello, its message number " + i,
      authorId: i.toString(),
      channelId: "0",
      attachments: [],
      replyId: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
})
</script>
