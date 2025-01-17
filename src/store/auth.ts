import { defineStore } from "pinia";
import { HTTPError } from "./errors";
import { useProfileStore } from "./profile";

export const useAuthStore = defineStore('auth', () => {

  async function signIn(authForm: { username: string, password: string }) {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/auth", {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authForm)
    })
    if (!response.ok) {
      throw new HTTPError(response)
    }
  }

  async function signOut() {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/auth/logout", {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new HTTPError(response)
    }
    const profileStore = useProfileStore()
    profileStore.unsetProfile()
  }

  async function signUp(signUpForm: { name: string, username: string, password: string }) {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/profile", {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpForm)
    })
    if (!response.ok) {
      throw new HTTPError(response)
    }
  }

  return { signIn, signOut, signUp }
})
