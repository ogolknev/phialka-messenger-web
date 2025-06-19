import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { Channel } from "./channel"
import { getChannels } from "../api"
import { useAPI } from "@/shared"

export const useChannelStore = defineStore("channel", () => {
  const channels = ref<Channel[]>([])
  const selectedId = ref<string | null>(null)
  const selectedChannel = computed(() => getChannelById(selectedId.value ?? ""))

  function resetChannels() {
    channels.value = []
  }

  function resetSelectedId() {
    selectedId.value = null
  }

  const getChannelsRequset = useAPI(getChannels)
  async function updateChannels(serverId: string) {
    const { execute, data, error } = getChannelsRequset
    await execute({ serverId })

    if (error.value) console.warn(error.value.message)

    channels.value = data.value ?? []
  }

  function selectChannel(channelId: string) {
    selectedId.value = channelId
  }

  function getChannelById(channelId: string) {
    return channels.value.find((channel) => channel.id === channelId)
  }

  return {
    channels,
    selectedId,
    selectedChannel,
    resetChannels,
    resetSelectedId,
    updateChannels,
    selectChannel,
    getChannelById,
  }
})
