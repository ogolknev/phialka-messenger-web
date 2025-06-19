import { defineStore } from "pinia"
import { ref } from "vue"
import type { Profile } from "./profile"
import { getProfile } from "../api"

export const useProfileStore = defineStore("profile", () => {
  const profile = ref<Profile | null>(null)

  function resetProfile() {
    profile.value = null
  }

  const isUpdateProfileRunning = ref(false)
  async function updateProfile() {
    try {
      isUpdateProfileRunning.value = true

      const fetchedProfile = await getProfile()

      profile.value = {
        id: fetchedProfile.id,
        name: fetchedProfile.name,
        tag: fetchedProfile.tag,
        description: fetchedProfile.description,
        birthdate: fetchedProfile.birthdate,
        photo: fetchedProfile.photo,
      }
    } catch (err) {
      if (err instanceof Error) {
        console.warn("Failed receive profile:", err.message)
      }
    } finally {
      isUpdateProfileRunning.value = false
    }
  }

  return {
    isUpdateProfileRunning,
    profile,
    resetProfile,
    updateProfile,
  }
})
