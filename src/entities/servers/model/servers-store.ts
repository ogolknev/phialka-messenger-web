import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Server } from './server'
import { getServers } from '../api/get-servers'

export const useServersStore = defineStore('servers', () => {
  const loading = ref(false)
  const servers = ref<Server[]>([])
  const selected = ref<Server | null>(null)

  function resetServers() {
    servers.value = []
  }

  function resetSelected() {
    selected.value = null
  }

  async function updateServers() {
    try {
      loading.value = true

      servers.value = await getServers()
    } finally {
      loading.value = false
    }
  }

  function selectServer(server: Server) {
    selected.value = server
  }

  return {
    loading,
    servers,
    selected,
    resetServers,
    resetSelected,
    updateServers,
    selectServer,
  }
})
