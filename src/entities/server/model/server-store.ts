import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Server } from './server'
import { getServers } from '../api/get-servers'

export const useServerStore = defineStore('server', () => {
  const loading = ref(false)
  const servers = ref<Server[]>([])
  const selectedId = ref('')

  function resetServers() {
    servers.value = []
  }

  function resetSelected() {
    selectedId.value = ''
  }

  async function updateServers() {
    try {
      loading.value = true

      servers.value = await getServers()
    } finally {
      loading.value = false
    }
  }

  function selectServer(serverId: string) {
    selectedId.value = serverId
  }

  function getServerById(serverId: string) {
    return servers.value.find((server) => server.id === serverId)
  }

  return {
    loading,
    servers,
    selectedId,
    resetServers,
    resetSelected,
    updateServers,
    selectServer,
    getServerById,
  }
})
