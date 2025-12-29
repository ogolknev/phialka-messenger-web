import createClient, { type Middleware } from "openapi-fetch"
import type { paths } from "../types/api"

const middleware: Middleware = {
  async onResponse({ request, response }) {
    if (response.status === 403) {
      const refreshResponse = await fetch("/api/auth/refresh", { credentials: "include" })
      if (refreshResponse.ok) {
        return fetch(request)
      }
    }
  },
}

const apiClient = createClient<paths>({
  baseUrl: "/api",
  credentials: "include",
})

apiClient.use(middleware)

export default apiClient
