<template>
  <div
    class="ui-input card flex items-center has-[input[type='file']]:cursor-pointer"
    :class="`${variant}-variant ${color}-color`"
    @click="fileInputRef?.click()"
  >
    <slot v-if="$slots.leading" name="leading"></slot>

    <template v-if="type === 'file'">
      <input ref="file-input" type="file" @change="onChange" hidden />
      <button class="w-full p-2 text-left whitespace-nowrap truncate outline-0">
        {{ fileName ?? "Select file" }}
      </button>
    </template>

    <input
      v-else
      ref="input"
      :value="modelValue"
      @input="onInput"
      class="w-full p-2 outline-0"
      type="text"
      :placeholder="placeholder"
    />
    <slot v-if="$slots.trailing" name="trailing"></slot>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue"
import type { UIComponentColor, UIInputVariant } from "../types"
import "./style/main.css"
import IMask, { InputMask } from "imask"

const {
  modelValue,
  type = "text",
  placeholder,
  color = "neutral",
  variant = "outline",
} = defineProps<{
  modelValue?: string
  type?: "text" | "date" | "file"
  placeholder?: string
  color?: UIComponentColor
  variant?: UIInputVariant
}>()
const emit = defineEmits<{ "update:modelValue": [value: string]; change: [file: File] }>()

const inputRef = useTemplateRef("input")
const fileInputRef = useTemplateRef("file-input")
const fileName = ref<string | null>(null)
let inputMask: null | InputMask = null

onMounted(() => {
  if (type === "date" && inputRef.value) {
    inputMask = IMask(inputRef.value, {
      mask: Date,
      min: new Date(1000, 0, 1),
      max: new Date(),
    })
    inputMask.on("accept", () => {
      emit("update:modelValue", inputMask?.value ?? "")
    })
  }
})

watch(
  () => modelValue,
  (newValue) => {
    if (inputMask && newValue !== inputMask.value) {
      inputMask.value = newValue ?? ""
    }
  },
)

onBeforeUnmount(() => {
  inputMask?.destroy()
})

function onInput(event: Event) {
  if (!(event.target instanceof HTMLInputElement))
    throw new Error("Must be used on HTMLInputElement")

  emit("update:modelValue", event.target.value)
}

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
