import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore('app', () => {
  const isAuth = ref(false)

  return { isAuth }
})
