import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useProfileStore } from "./profile";

export const useAppStore = defineStore('app', () => {
  const isAuth = computed(() => useProfileStore().profile != null)
  const toasts = ref<string[]>([])

  return { isAuth, toasts }
})
