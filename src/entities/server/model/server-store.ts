import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { Server } from "./server"
import { getServers } from "../api/get-servers"
import { useAPI } from "@/shared"

export const useServerStore = defineStore("server", () => {
  const servers = ref<Server[]>([])
  const selectedId = ref<string | null>(null)
  const selectedServer = computed(() => getServerById(selectedId.value ?? ""))

  function resetServers() {
    servers.value = []
  }

  function resetSelectedId() {
    selectedId.value = null
  }

  const getServersRequest = useAPI(getServers)
  async function updateServers() {
    const { execute, data, error } = getServersRequest
    await execute()

    if (error.value) console.warn(error.value.message)

    servers.value = data.value ?? []
  }

  function selectServer(serverId: string) {
    selectedId.value = serverId
  }

  function getServerById(serverId: string) {
    return servers.value.find((server) => server.id === serverId)
  }

  return {
    servers,
    selectedId,
    selectedServer,
    resetServers,
    resetSelectedId,
    updateServers,
    selectServer,
    getServerById,
  }
})
