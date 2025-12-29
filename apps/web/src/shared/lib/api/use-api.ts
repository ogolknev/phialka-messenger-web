import { HTTPError } from "@/shared/model"
import { ref } from "vue"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAPI<T extends (...args: any[]) => Promise<any>>(cb: T) {
  const loading = ref(false)
  const error = ref<HTTPError | null>(null)
  const data = ref<Awaited<ReturnType<T>> | null>(null)

  const execute = async (...args: Parameters<T>): Promise<void> => {
    if (loading.value) return
    loading.value = true

    try {
      data.value = await cb(...args)
      error.value = null
      return data.value
    } catch (cathedError) {
      if (cathedError instanceof HTTPError) error.value = cathedError
      else throw cathedError
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    data,
    execute,
  }
}
