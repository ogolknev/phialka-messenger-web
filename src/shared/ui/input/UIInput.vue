<template>
  <div
    class="input card flex h-11 items-center gap-2 overflow-hidden px-3
      has-[input[type='file']]:cursor-pointer
      has-[input[type='file']]:hover:bg-neutral-800"
    :class="[` ${variant}-variant ${color}-color `, { highlight }]"
    @click="fileInputRef?.click()">
    <div v-if="$slots.leading || icon">
      <Icon v-if="icon" :icon="icon" class="text-neutral-400"></Icon>
      <slot name="leading"></slot>
    </div>

    <template v-if="type === 'file'">
      <input ref="file-input" type="file" @change="onChange" hidden />
      <button
        type="button"
        class="min-w-0 flex-1 cursor-pointer text-neutral-400 outline-0">
        <span class="block truncate text-left">
          {{ fileName ?? placeholder ?? "Select file" }}
        </span>
      </button>
    </template>

    <input
      v-else
      ref="input"
      :value="modelValue"
      @input="update"
      class="w-full outline-0"
      :type="type === 'password' ? 'password' : 'text'"
      :placeholder="placeholder" />
    <div v-if="$slots.trailing || trailingIcon" class="mr-3">
      <Icon
        v-if="trailingIcon"
        :icon="trailingIcon"
        class="text-neutral-400"></Icon>
      <slot name="trailing"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue"
import type { UIComponentColor } from "@/shared"
import type { UIInputVariant } from "./types"
import "./style/main.css"
import { Icon } from "@iconify/vue"
import { formatDateInput } from "./lib/format-date-input"

const {
  modelValue,
  type = "text",
  placeholder,
  color = "neutral",
  variant = "outline",
  icon,
  trailingIcon,
  highlight,
} = defineProps<{
  modelValue?: string
  type?: "text" | "date" | "file" | "password"
  placeholder?: string
  color?: UIComponentColor
  variant?: UIInputVariant
  icon?: string
  trailingIcon?: string
  highlight?: boolean
}>()
const emit = defineEmits<{
  "update:modelValue": [value: string]
  change: [file: File]
}>()

const fileInputRef = useTemplateRef("file-input")
const fileName = ref<string | null>(null)

let update: (ev: Event) => void

onMounted(() => {
  if (type === "date") {
    update = (ev) => {
      const target = ev.target as HTMLInputElement

      target.value = formatDateInput(target.value)
      emit("update:modelValue", target.value)
    }
  } else {
    update = (ev) =>
      emit("update:modelValue", (ev.target as HTMLInputElement).value)
  }
})

function onChange(event: Event) {
  if (!(event.target instanceof HTMLInputElement))
    throw new Error("Must be used on HTMLInputElement")

  const file = event.target.files?.[0]
  if (!file) {
    return
  }

  fileName.value = file.name

  emit("change", file)
}
</script>
