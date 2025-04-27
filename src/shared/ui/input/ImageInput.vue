<script setup lang='ts'>
import { useTemplateRef } from 'vue';
import { DefaultImage } from '../image';

const { src } = defineProps<{ src?: string }>()
const emit = defineEmits<{ fileload: [file: Blob] }>()
const input = useTemplateRef('input')

function onChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) emit('fileload', file)
}
</script>

<template>
  <div class="image-input tile" tabindex="0" @click="() => input?.click()">
    <input ref="input" type="file" accept="image/*" @change="onChange">
    <DefaultImage class="image" :src="src"></DefaultImage>
  </div>
</template>

<style scoped>
.image-input {
  display: grid;
  place-items: center;
}

.image-input:hover,
.image-input:focus {
  color: var(--clr-accent);
  border-color: var(--clr-accent);
}

.image {
  width: 80%
}

input {
  display: none;
}
</style>
