<script setup lang='ts'>

const { src } = defineProps<{ src?: string }>()

const DEFAULT_IMAGE_SRC = ''
</script>

<template>
  <div class="default-image">
    <img :src="src ?? DEFAULT_IMAGE_SRC" alt="image">
  </div>
</template>
