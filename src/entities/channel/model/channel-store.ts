import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Channel } from './channel'
import { getChannels } from '../api'

export const useChannelStore = defineStore('channel', () => {
  const channels = ref<Channel[]>([])
  const selectedId = ref('')

  function resetChannels() {
    channels.value = []
  }

  function resetSelectedId() {
    selectedId.value = ''
  }

  const isUpdateChannelsRunning = ref(false)
  async function updateChannels(serverId: string) {
    try {
      isUpdateChannelsRunning.value = true

      channels.value = await getChannels({ serverId })
    } finally {
      isUpdateChannelsRunning.value = false
    }
  }

  function selectChannel(channelId: string) {
    selectedId.value = channelId
  }

  function getChannelById(channelId: string) {
    return channels.value.find((channel) => channel.id === channelId)
  }

  return {
    isUpdateChannelsRunning,
    channels,
    selectedId,
    resetChannels,
    resetSelectedId,
    updateChannels,
    selectChannel,
    getChannelById,
  }
})
