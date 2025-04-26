<script setup lang="ts">
const { src } = defineProps<{ src?: string }>()

const DEFAULT_IMAGE_SRC = ''
</script>

<template>
  <img class="default-image" :src="src ?? DEFAULT_IMAGE_SRC" alt="image" />
</template>
