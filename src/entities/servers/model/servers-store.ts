import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Server } from './server'
import { getServers } from '../api/get-servers'

export const useServersStore = defineStore('servers', () => {
  const loading = ref(false)
  const servers = ref<Server[]>([])

  function resetServers() {
    servers.value = []
  }

  async function updateServers() {
    try {
      loading.value = true

      servers.value = await getServers()
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    servers,
    resetServers,
    updateServers,
  }
})
