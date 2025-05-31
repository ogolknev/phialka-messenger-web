<template>
  <div class="user-card tile">
    <DefaultThumbnail></DefaultThumbnail>
    <span class="name">{{ user.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { DefaultThumbnail } from '@/shared'
import type { User } from '../model'

const { user } = defineProps<{ user: User }>()
</script>

<style scoped>
.user-card {
  padding: var(--gap-size-xs);
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: center;
  gap: var(--gap-size-m);
}

.name {
  font-size: var(--font-size-m);
}
</style>
