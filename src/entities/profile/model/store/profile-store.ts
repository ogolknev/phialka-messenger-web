import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Profile } from '../interface'
import { getProfile } from '../../api'

export const useProfileStore = defineStore('profile', () => {
  const loading = ref(false)
  const profile = reactive<Profile>({
    name: '',
    tag: '',
    description: '',
    birthdate: null,
    photo: null,
  })

  function reset() {
    profile.name = ''
    profile.tag = ''
    profile.description = ''
    profile.birthdate = null
    profile.photo = null
  }

  async function updateProfile() {
    try {
      loading.value = true

      const fetchedProfile = await getProfile()

      profile.name = fetchedProfile.name
      profile.tag = fetchedProfile.tag
      profile.description = fetchedProfile.description
      profile.birthdate = fetchedProfile.birthdate
      profile.photo = fetchedProfile.photo
    } catch (error) {
      throw new Error(`Can't fetch profile: ${error instanceof Error ? error.message : error}`)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    profile,
    reset,
    updateProfile,
  }
})
