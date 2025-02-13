import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore('app', () => {
  const profile = ref<API.Profile | null>(null)
  const servers = ref<API.Server[]>([])
  const selectedServerID = ref<string | null>(null)
  const toasts = ref<string[]>([])

  return { profile, servers, selectedServerID, toasts }
})
