<template>
  <div class="grid h-full grid-cols-[auto_1fr_3fr] gap-2">
    <div ref="server-panel" class="grid grid-rows-[auto_minmax(0,1fr)] gap-2 overflow-hidden">
      <UIButton
        class="text-xl"
        icon="lucide:plus"
        color="primary"
        variant="outline"
        to="/server/create"></UIButton>

      <div class="scrollbar-hidden flex flex-col gap-1 overflow-auto scroll-smooth">
        <template v-for="server in serverStore.servers" :key="server.id">
          <ServerBubble class="size-12" :server></ServerBubble>
        </template>
      </div>
    </div>

    <div ref="chat-list-panel" class="scrollbar-hidden relative overflow-hidden">
      <div class="card scrollbar-hidden h-full overflow-auto scroll-smooth bg-neutral-900 p-2">
        <template v-if="serverStore.selectedId">
          <template
            v-for="(channel, index) in channelStore.channelsMap[serverStore.selectedId]"
            :key="channel.id">
            <ChannelCard
              class="w-full overflow-hidden"
              :class="[
                index === 0 ? 'rounded-t-lg' : '',
                index === channelStore.channels.length - 1 ? 'rounded-b-lg' : '',
              ]"
              :channel></ChannelCard>

            <div
              v-if="index !== channelStore.channels.length - 1"
              class="my-2 h-px bg-neutral-800"></div>
          </template>
        </template>
      </div>

      <UIButton
        v-if="serverStore.selectedId"
        class="absolute right-1 bottom-1 p-3"
        icon="lucide:pen"
        color="primary"
        @click="() => router.push(`/server/${serverStore.selectedId}/channel/create`)"></UIButton>
    </div>

    <div class="chat grid grid-rows-[auto_1fr_auto] gap-2 overflow-hidden">
      <header
        class="card grid h-12 grid-cols-[auto_1fr_auto] items-center gap-2 bg-neutral-900 px-2">
        <UIImage class="aspect-square size-8"></UIImage>
        <span class="h-8">
          <UISkeleton></UISkeleton>
        </span>
        <UIButton class="text-sm" icon="lucide:x" color="error" variant="soft"></UIButton>
      </header>
      <div class="overflow-hidden">
        <UIInfiniteScroll
          class="h-full"
          :load-start-data="loadOldMessages"
          :load-end-data="loadNewMessages"
          :no-more-end-data="newMessagesNumber === 0">
          <div class="flex flex-col gap-2 overflow-hidden w-9/10 mx-auto">
            <template
              v-for="message in channelMessagesStore.messages[channelStore.selectedId]"
              :key="message.id">
              <MessageBubble
                class="size-fit max-w-1/2"
                :class="
                  message.authorId !== profileStore.profile.id ? 'ml-auto flex-row-reverse' : ''
                "
                :message></MessageBubble>
            </template>
          </div>
        </UIInfiniteScroll>
      </div>
      <footer
        class="card grid grid-cols-[auto_1fr_auto] grid-rows-[1fr] items-start gap-2 bg-neutral-900
          p-2">
        <UIButton class="p-3.5 text-sm" icon="lucide:paperclip" variant="soft"></UIButton>

        <UITextarea v-model="newMessageText" :max-rows="5" color="primary"></UITextarea>

        <UIButton
          class="p-3.5 text-sm"
          icon="lucide:send-horizontal"
          variant="soft"
          color="primary"
          @click="sendMessage"></UIButton>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import {
  ChannelCard,
  MessageBubble,
  ServerBubble,
  useChannelStore,
  useProfileStore,
  useServerStore,
} from "@/entities"
import { apiClient, UIImage, UIInfiniteScroll, UISkeleton, UITextarea } from "@/shared"
import UIButton from "@/shared/ui/button/ui/UIButton.vue"
import { useRouter } from "vue-router"
import { useChannelMessagesStore } from "@/entities/channel/model/channel-messages-store"
import { sendChannelMessage } from "@/features/send-channel-message"

const router = useRouter()
const profileStore = useProfileStore()
const serverStore = useServerStore()
const channelStore = useChannelStore()
const channelMessagesStore = useChannelMessagesStore()

const newMessagesNumber = ref(0)

const newMessageText = ref("")

async function sendMessage() {
  if (newMessageText.value.trim() === "") return

  await sendChannelMessage({
    channelId: channelStore.selectedId,
    body: {
      content: newMessageText.value.trim(),
    },
  })
  newMessageText.value = ""

  await loadNewMessages()
}

async function loadNewMessages() {
  newMessagesNumber.value = await channelMessagesStore.loadNewMessages(channelStore.selectedId)
}

async function loadOldMessages() {
  await channelMessagesStore.loadOldMessages(channelStore.selectedId)
}

watch(
  () => channelStore.selectedId,
  async () => {
    await channelMessagesStore.loadMessages(channelStore.selectedId)
  },
)

onMounted(async () => {
  const { response } = await apiClient.GET("/auth/refresh")
  if (response.status === 403) router.push("/login")

  await profileStore.updateProfile()
  await serverStore.updateServers()
  await channelStore.updateChannels(serverStore.servers.map((server) => server.id))
  await channelMessagesStore.loadMessages(channelStore.selectedId)

  setInterval(async () => {
    await loadNewMessages()
  }, 5000)
})
</script>
