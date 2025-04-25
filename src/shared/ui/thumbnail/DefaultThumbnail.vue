<script setup lang="ts">
import { DefaultImage } from '../image'

const { src } = defineProps<{ src?: string }>()
</script>

<template>
  <div class="default-thumbnail">
    <DefaultImage class="thumbnail-image" :src="src"></DefaultImage>
  </div>
</template>

<style scoped>
.default-thumbnail {
  border-radius: 50%;
  overflow: hidden;
}

.thumbnail-image {
  height: 100%;
  width: 100%;
}
</style>
