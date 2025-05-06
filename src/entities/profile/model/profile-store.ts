import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Profile } from './profile'
import { getProfile } from '../api'

export const useProfileStore = defineStore('profile', () => {
  const profile = reactive<Profile>({
    id: '',
    name: '',
    tag: '',
    description: '',
    birthdate: null,
    photo: null,
  })

  function resetProfile() {
    profile.id = ''
    profile.name = ''
    profile.tag = ''
    profile.description = ''
    profile.birthdate = null
    profile.photo = null
  }

  const isUpdateProfileRunning = ref(false)
  async function updateProfile() {
    try {
      isUpdateProfileRunning.value = true

      const fetchedProfile = await getProfile()

      profile.id = fetchedProfile.id
      profile.name = fetchedProfile.name
      profile.tag = fetchedProfile.tag
      profile.description = fetchedProfile.description
      profile.birthdate = fetchedProfile.birthdate
      profile.photo = fetchedProfile.photo
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
