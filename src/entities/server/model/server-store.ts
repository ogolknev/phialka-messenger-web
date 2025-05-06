import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Server } from './server'
import { getServers } from '../api/get-servers'

export const useServerStore = defineStore('server', () => {
  const servers = ref<Server[]>([])
  const selectedId = ref('')

  function resetServers() {
    servers.value = []
  }

  function resetSelectedId() {
    selectedId.value = ''
  }

  const isUpdateServersRunning = ref(false)
  async function updateServers() {
    try {
      isUpdateServersRunning.value = true

      servers.value = await getServers()
    } finally {
      isUpdateServersRunning.value = false
    }
  }

  function selectServer(serverId: string) {
    selectedId.value = serverId
  }

  function getServerById(serverId: string) {
    return servers.value.find((server) => server.id === serverId)
  }

  return {
    isUpdateServersRunning,
    servers,
    selectedId,
    resetServers,
    resetSelectedId,
    updateServers,
    selectServer,
    getServerById,
  }
})
