<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const model = defineModel({ required: true, type: String })
const {
  color,
  rows = 1,
  maxRows = 1,
} = defineProps<{
  color: 'success' | 'warning' | 'danger'
  rows?: string | number
  maxRows?: string | number
}>()
const textarea = ref<HTMLTextAreaElement>()
const lineHeight = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue('--line-height'),
)

const resizeTextarea = (textarea: HTMLTextAreaElement) => {
  const style = getComputedStyle(textarea)
  const borderTopWidth = parseFloat(style.borderTopWidth)
  const borderBottomWidth = parseFloat(style.borderBottomWidth)
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + borderTopWidth + borderBottomWidth + 'px'
  textarea.scrollTop = textarea.scrollHeight
}

const setTextareaPaddingBlock = (textarea: HTMLTextAreaElement) => {
  const style = getComputedStyle(textarea)
  const fontSize = parseFloat(style.fontSize)
  const borderTopWidth = parseFloat(style.borderTopWidth)
  const borderBottomWidth = parseFloat(style.borderBottomWidth)
  const realLineHeight = fontSize * lineHeight + borderTopWidth + borderBottomWidth
  textarea.style.height = 'var(--tile-size)'
  textarea.style.paddingBlock = `calc((var(--tile-size) - ${realLineHeight}px) / 2)`
}

const setTextareaMaxHeight = (textarea: HTMLTextAreaElement) => {
  const style = getComputedStyle(textarea)
  const fontSize = parseFloat(style.fontSize)
  const borderTopWidth = parseFloat(style.borderTopWidth)
  const borderBottomWidth = parseFloat(style.borderBottomWidth)
  const paddingBlock = parseFloat(style.paddingBlock)
  textarea.style.maxHeight = `${fontSize * lineHeight * Number(maxRows) + borderBottomWidth + borderTopWidth + paddingBlock * 2}px`
}

watch(model, () => {
  if (textarea.value) {
    resizeTextarea(textarea.value)
  }
})

onMounted(() => {
  if (textarea.value) {
    setTextareaPaddingBlock(textarea.value)
    setTextareaMaxHeight(textarea.value)
    resizeTextarea(textarea.value)
  }
})
</script>

<template>
  <textarea
    ref="textarea"
    v-model="model"
    class="tile input input-textarea"
    :class="[color]"
    :rows="rows"
  ></textarea>
</template>

<style scoped>
.input-textarea {
  --accent-input: var(--accent-0);
}

.input-textarea.success {
  --accent-input: var(--success-0);
}

.input-textarea.warning {
  --accent-input: var(--warning-0);
}

.input-textarea.danger,
.input-textarea.invalid {
  --accent-input: var(--danger-0);
}

.input-textarea {
  resize: none;
  line-height: v-bind('lineHeight');
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.input-textarea:focus {
  border-color: var(--accent-input);
  caret-color: var(--accent-input);
}
</style>
