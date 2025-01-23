import { defineStore } from "pinia";
import { HTTPError } from "./errors";
import { ref } from "vue";

export const useProfileStore = defineStore('profile', () => {

  const profile = ref<API.Profile | null>(null)

  function setProfile(profileData: API.Profile) {
    profile.value = profileData
  }

  function unsetProfile() {
    profile.value = null
  }

  async function getProfile() {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/profile", {
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
    setProfile(await response.json() as API.Profile)
  }

  async function editProfile(payload: API.ProfileEdit) {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/profile", {
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

  async function setProfilePhoto(formData: FormData) {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/profile/photo", {
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

  return { profile, getProfile, unsetProfile, editProfile, setProfilePhoto }
})
