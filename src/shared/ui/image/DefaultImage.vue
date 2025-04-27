<script setup lang="ts">
import { ImageIcon } from '../icon';
const { src } = defineProps<{ src?: string }>()

</script>

<template>
  <img v-if="src" class="default-image" :src="src" alt="image" />
  <ImageIcon v-else class="default-image"></ImageIcon>
</template>
