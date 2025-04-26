<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

const {
  rows = 1,
  maxRows,
  placeholder,
} = defineProps<{ rows?: number; maxRows?: number; placeholder?: string }>()
const textareaRef = useTemplateRef('textarea')

function autoResize() {
  const textarea = textareaRef.value
  if (!textarea) return

  textarea.style.height = 'auto'

  const computedStyle = getComputedStyle(textarea)
  const lineHeight = parseFloat(computedStyle.lineHeight || '0')
  const maxHeight = lineHeight * (maxRows || rows)
  const topBorderWidth = parseFloat(computedStyle.borderTopWidth || '0')
  const bottomBorderWidth = parseFloat(computedStyle.borderBottomWidth || '0')


  textarea.style.height = Math.min(maxHeight, textarea.scrollHeight) + topBorderWidth + bottomBorderWidth + 'px'
  textarea.scrollTop = textarea.scrollHeight
}

onMounted(() => {
  autoResize()
})
</script>

<template>
  <textarea ref="textarea" class="text-area input tile" :rows="rows" @input="autoResize"
    :placeholder="placeholder"></textarea>
</template>

<style scoped>
@import './style/main.css';

textarea {
  resize: none;
}
</style>
