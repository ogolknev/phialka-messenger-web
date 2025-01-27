import { defineStore } from "pinia";
import { HTTPError } from "./errors";
import { ref } from "vue";

export const useServersStore = defineStore('servers', () => {

  const servers = ref<API.Server[]>([])
  const selectedServerId = ref<string>('')

  async function createServer(payload: API.ServerCreate) {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/servers", {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      throw new HTTPError(response)
    }
  }

  async function editServer(payload: API.ServerEdit, serverId: string) {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/servers/" + serverId, {
      method: 'PATCH',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      throw new HTTPError(response)
    }
  }

  async function removeServer(serverId: string) {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/servers/" + serverId, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if (!response.ok) {
      throw new HTTPError(response)
    }
  }

  async function setServerIcon(logo: Blob, serverId: string) {
    const formData = new FormData()
    formData.append('logo', logo)
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/servers/" + serverId + "/logo", {
      method: 'PUT',
      headers: {
        accept: 'application/json'
      },
      body: formData
    })
    if (!response.ok) {
      throw new HTTPError(response)
    }
  }

  async function getServers() {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/servers", {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if (!response.ok) {
      throw new HTTPError(response)
    }
    servers.value = await response.json() as API.Server[]
  }

  return { servers, selectedServerId, createServer, editServer, removeServer, setServerIcon, getServers }
})
