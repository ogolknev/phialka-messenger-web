<template>
  <div ref="root" class="overflow-y-auto">
    <div v-show="!noMoreStartData" ref="start-loader" class="grid h-20 place-content-center">
      <Icon class="animate-spin text-2xl" icon="lucide:loader-circle"></Icon>
    </div>
    <slot></slot>
    <div v-show="!noMoreEndData" ref="end-loader" class="grid h-20 place-content-center">
      <Icon class="animate-spin text-2xl" icon="lucide:loader-circle"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef } from "vue"

type InfiniteScrollProps = {
  noMoreStartData?: boolean
  noMoreEndData?: boolean
  loadStartData?: () => Promise<void>
  loadEndData?: () => Promise<void>
  cleanStartData?: () => void
  cleanEndData?: () => void
}

const rootEl = useTemplateRef("root")
const startLoader = useTemplateRef("start-loader")
const endLoader = useTemplateRef("end-loader")

const { noMoreEndData, noMoreStartData, loadStartData, loadEndData, cleanStartData, cleanEndData } =
  defineProps<InfiniteScrollProps>()

function getScrollAmount() {
  if (!rootEl.value) return

  return rootEl.value.scrollTop
}

function setScrollAmount(amount: number) {
  if (!rootEl.value) return

  rootEl.value.scrollTop = amount
}

function getScrollSize() {
  if (!rootEl.value) return

  return rootEl.value.scrollHeight
}

const loadingStartData = ref(false)
async function handleStartIntersection(entry: IntersectionObserverEntry) {
  if (!entry.isIntersecting || loadingStartData.value || !loadStartData) return

  console.log("start")

  loadingStartData.value = true

  const scrollSizeBefore = getScrollSize() ?? 0
  const scrollAmountBefore = getScrollAmount() ?? 0

  await loadStartData()
  await nextTick()

  const scrollSizeAfter = getScrollSize() ?? 0
  const scrollAmountAfter = getScrollAmount() ?? 0

  const deltaScrollSize = scrollSizeAfter - scrollSizeBefore
  const deltaScrollAmount = scrollAmountAfter - scrollAmountBefore

  if (deltaScrollAmount <= 0) setScrollAmount(scrollAmountAfter + deltaScrollSize)

  await handleCleanEndData()

  loadingStartData.value = false
}

async function handleCleanEndData() {
  await nextTick()

  if (!cleanEndData) return
  cleanEndData()
}

const loadingEndData = ref(false)
async function handleEndIntersection(entry: IntersectionObserverEntry) {
  if (!entry.isIntersecting || loadingEndData.value || !loadEndData) return

  console.log("end")

  loadingEndData.value = true

  await loadEndData()

  await handleCleanStartData()

  loadingEndData.value = false
}

async function handleCleanStartData() {
  await nextTick()

  if (!cleanStartData) return
  cleanStartData()
}

let startIntersectionObserver: IntersectionObserver
let endIntersectionObserver: IntersectionObserver
onMounted(() => {
  if (rootEl.value && startLoader.value && endLoader.value) {
    const intersectionObserverOptions: IntersectionObserverInit = {
      root: rootEl.value,
      rootMargin: "500px",
      threshold: 1,
    }

    startIntersectionObserver = new IntersectionObserver(
      (entries) => handleStartIntersection(entries[0]),
      intersectionObserverOptions,
    )
    startIntersectionObserver.observe(startLoader.value)

    endIntersectionObserver = new IntersectionObserver(
      (entries) => handleEndIntersection(entries[0]),
      intersectionObserverOptions,
    )
    endIntersectionObserver.observe(endLoader.value)
  }
})

onUnmounted(() => {
  startIntersectionObserver.disconnect()
  endIntersectionObserver.disconnect()
})
</script>
