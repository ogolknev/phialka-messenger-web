import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { getChannels } from "../api"
import { HTTPError } from "@/shared"
import type { Channel } from "./channel"

export const useChannelStore = defineStore("channel", () => {
  const channelsMap = ref<{ [serverId: string]: Channel[] }>({})
  const channels = computed(getChannelsList)
  const loadingMap = ref<{ [serverId: string]: boolean }>({})
  const abortControllerMap = new Map<string, AbortController | null>()
  const selectedId = ref<string | null>(null)
  const selectedChannel = computed(() => getChannelById(selectedId.value ?? ""))

  function resetChannelsMap() {
    channelsMap.value = {}
  }

  function resetSelectedId() {
    selectedId.value = null
  }

  async function updateChannels(serverIds: string[]) {
    for (const serverId of serverIds) {
      await updateServerChannels(serverId)
    }
  }

  async function updateServerChannels(serverId: string) {
    try {
      abortControllerMap.get(serverId)?.abort()
      abortControllerMap.set(serverId, new AbortController())
      loadingMap.value[serverId] = true

      channelsMap.value[serverId] = await getChannels(
        { serverId },
        { signal: abortControllerMap.get(serverId)!.signal },
      )
    } catch (err) {
      if (err instanceof HTTPError) console.warn(err.message)
      else throw err
    } finally {
      abortControllerMap.set(serverId, null)
      loadingMap.value[serverId] = false
    }
  }

  function selectChannel(channelId: string) {
    selectedId.value = channelId
  }

  function getChannelById(channelId: string) {
    return channels.value.find((channel) => channel.id === channelId)
  }

  function getChannelsList() {
    return Object.values(channelsMap.value).flat()
  }

  return {
    channels,
    channelsMap,
    selectedId,
    selectedChannel,
    loadingMap,
    resetChannelsMap,
    resetSelectedId,
    updateChannels,
    selectChannel,
    getChannelById,
  }
})
