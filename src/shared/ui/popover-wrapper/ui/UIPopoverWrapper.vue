<template>
  <div ref="trigger" class="size-fit">
    <slot name="trigger"></slot>
    <UIOverlayWrapper v-if="open && !disabled">
      <div ref="popover" class="pointer-events-auto absolute size-fit" :style="position">
        <slot name="popover"></slot>
      </div>
    </UIOverlayWrapper>
  </div>
</template>

<script setup lang="ts">
import { UIOverlayWrapper, useClickOutside } from "@/shared"
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch } from "vue"
import {
  getPopoverPosition,
  type PopoverAlign,
  type PopoverSide,
} from "../lib/get-popover-position"

const triggerRef = useTemplateRef("trigger")
const popoverRef = useTemplateRef("popover")

const open = defineModel<boolean>({ default: false })
const {
  align,
  side,
  notCloseOnScroll = false,
} = defineProps<{
  align?: PopoverAlign
  side?: PopoverSide
  notCloseOnScroll?: boolean
  disabled?: boolean
}>()
const position = ref("")

function updatePopoverPosition() {
  console.log("update")
  if (triggerRef.value && popoverRef.value) {
    const { left, top } = getPopoverPosition(triggerRef.value, popoverRef.value, {
      content: { align, side },
    })
    position.value = `left: ${left}px; top: ${top}px;`
  }
}

function close() {
  if (notCloseOnScroll) return
  open.value = false
}

watch(open, async (value) => {
  if (value) {
    await nextTick()
    updatePopoverPosition()
  }
})

useClickOutside(popoverRef, async (ev) => {
  if (!triggerRef.value?.contains(ev.target as HTMLElement)) {
    open.value = false
  }
})

onMounted(async () => {
  addEventListener("scroll", close, true)
})

onUnmounted(() => {
  removeEventListener("scroll", close, true)
})
</script>
