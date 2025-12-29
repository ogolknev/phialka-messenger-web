import { defineStore } from "pinia"
import { reactive } from "vue"
import type { User } from "./user"
import api from "../api"

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

  async function searchUsers(query: string) {
    const foundUsers = await api.searchUsers(query)

    console.log("searchUsers found:", foundUsers)
    for (const user of foundUsers) {
      users[user.id] = user
    }
    return foundUsers
  }

  return {
    users,
    isGetUserByIdRunning,
    getUserById,
    searchUsers,
  }
})
