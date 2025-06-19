import { onMounted, onUnmounted, type Ref } from "vue"

export function useClickOutside(
  targetRef: Ref<Node | null>,
  cb: (event: MouseEvent) => void,
  options?: AddEventListenerOptions,
) {
  const handler = (event: MouseEvent) => {
    const target = targetRef.value
    if (!target || target.contains(event.target as Node)) return
    cb(event)
  }

  onMounted(() => {
    addEventListener("click", handler, options)
    addEventListener("contextmenu", handler, options)
  })

  onUnmounted(() => {
    removeEventListener("click", handler, options)
    removeEventListener("contextmenu", handler, options)
  })
}
