import { useFetch } from "@/composables/fetch";

export const fetchAPI = useFetch({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  baseHeaders: {
    accept: 'application/json',
    'Content-Type': 'application/json'
  },
})
