<template>
  <div
    ref="container"
    class="textarea card flex h-11 items-center overflow-hidden px-3"
    :class="[` ${variant}-variant ${color}-color `, { highlight }]">
    <div class="flex w-full items-start gap-2">
      <Icon v-if="icon" :icon class="mt-1 grow-0 text-neutral-400"></Icon>
      <textarea
        ref="textarea"
        class="w-full resize-none overflow-y-auto outline-0"
        rows="1"
        v-model="modelValue"
        :placeholder></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import type { UIComponentColor } from "@/shared"
import type { UITextAreaVariant } from "./types"
import { onMounted, useTemplateRef, watch } from "vue"
import "./style/main.css"

const modelValue = defineModel<string>()
const {
  placeholder,
  color = "neutral",
  variant = "outline",
  icon,
  highlight,
  maxRows = Infinity,
} = defineProps<{
  placeholder?: string
  color?: UIComponentColor
  variant?: UITextAreaVariant
  icon?: string
  highlight?: boolean
  maxRows?: number | string
}>()

const textareaRef = useTemplateRef("textarea")
const containerRef = useTemplateRef("container")

let padding: number

watch(modelValue, autoResizeTextarea)

onMounted(() => {
  autoResizeTextarea()
})

function autoResizeTextarea() {
  const textarea = textareaRef.value
  const container = containerRef.value
  if (!textarea || !container) return

  const _maxRows = typeof maxRows === "number" ? maxRows : parseInt(maxRows)

  padding =
    parseInt(getComputedStyle(container).height) -
    parseInt(getComputedStyle(textarea).height)

  const rowCount = getRowCount() ?? 1

  if (rowCount <= _maxRows) {
    textarea.style.height = "auto"

    textarea.style.height = textarea.scrollHeight + "px"
    container.style.height = textarea.scrollHeight + padding + "px"
  }
}

function getRowCount() {
  const textarea = textareaRef.value
  if (!textarea) return

  const computedStyle = getComputedStyle(textarea)

  const lineHeight = parseInt(computedStyle.lineHeight)
  const paddingY =
    parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom)
  const scrollHeight = textarea.scrollHeight

  const rowCount = (scrollHeight - paddingY) / lineHeight

  return rowCount
}
</script>
