<script setup lang='ts'>
import { onMounted, useTemplateRef } from 'vue';

const { rows = 1, maxRows = rows } = defineProps<{ rows?: number, maxRows?: number }>()
const textareaRef = useTemplateRef('textarea')

function autoResize() {
  const textarea = textareaRef.value
  if (!textarea) return

  textarea.style.height = 'auto'

  const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight || '0')
  const maxHeight = lineHeight * maxRows

  textarea.style.height = Math.min(maxHeight, textarea.scrollHeight) + 'px'
}

onMounted(() => {
  autoResize()
})
</script>

<template>
  <div class="text-area">
    <textarea ref="textarea" :rows="rows" @input="autoResize"></textarea>
  </div>
</template>
