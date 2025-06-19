import { defineStore } from "pinia"
import { reactive } from "vue"
import type { User } from "./user"
import * as api from "../api/get-user-by-id"

export const useUserStore = defineStore("user", () => {
  const users = reactive<Record<string, User>>({})

  const isGetUserByIdRunning = reactive<Record<string, boolean>>({})
  async function getUserById(userId: string) {
    isGetUserByIdRunning[userId] = true

    try {
      if (!users[userId]) users[userId] = await api.getUserById(userId)
      return users[userId]
    } finally {
      isGetUserByIdRunning[userId] = false
    }
  }

  return {
    users,
    isGetUserByIdRunning,
    getUserById,
  }
})
