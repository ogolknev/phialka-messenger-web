import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Channel } from './channel'
import { getChannels } from '../api'

export const useChannelStore = defineStore('channel', () => {
  const loading = ref(false)
  const channels = ref<Channel[]>([])
  const selectedId = ref('')

  function resetChannels() {
    channels.value = []
  }

  function resetSelected() {
    selectedId.value = ''
  }

  async function updateChannels(serverId: string) {
    try {
      loading.value = true

      channels.value = await getChannels({ serverId })
    } finally {
      loading.value = false
    }
  }

  function selectChannel(channelId: string) {
    selectedId.value = channelId
  }

  function getChannelById(channelId: string) {
    return channels.value.find((channel) => channel.id === channelId)
  }

  return {
    loading,
    channels,
    selectedId,
    resetChannels,
    resetSelected,
    updateChannels,
    selectChannel,
    getChannelById,
  }
})
