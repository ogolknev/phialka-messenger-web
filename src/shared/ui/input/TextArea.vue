<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'


const {
  rows = 1,
  maxRows = 1,
  placeholder,
} = defineProps<{ rows?: number; maxRows?: number; placeholder?: string }>()
const model = defineModel<string>({ required: true })
const textareaRef = useTemplateRef('textarea')

function autoResize() {
  const textarea = textareaRef.value
  if (!textarea) return

  textarea.style.height = 'auto'

  const computedStyle = getComputedStyle(textarea)
  const lineHeight = parseFloat(computedStyle.lineHeight || '0')
  const topBorderWidth = parseFloat(computedStyle.borderTopWidth || '0')
  const bottomBorderWidth = parseFloat(computedStyle.borderBottomWidth || '0')
  const topPadding = parseFloat(computedStyle.paddingTop || '0')
  const bottomPadding = parseFloat(computedStyle.paddingBottom || '0')
  const maxHeight = lineHeight * Math.max(rows, maxRows) + topPadding + bottomPadding


  textarea.style.height = Math.min(maxHeight, textarea.scrollHeight) + topBorderWidth + bottomBorderWidth + 'px'
  textarea.scrollTop = textarea.scrollHeight
}

onMounted(() => {
  autoResize()
})
</script>

<template>
  <textarea ref="textarea" v-model="model" class="text-area input tile" :rows="rows" @input="autoResize"
    :placeholder="placeholder"></textarea>
</template>

<style scoped>
@import './style/main.css';

textarea {
  resize: none;
}
</style>
