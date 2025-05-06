<script setup lang="ts">
import { DefaultThumbnail } from '@/shared'
import type { Channel } from '../model/channel'

const { channel } = defineProps<{ channel: Channel }>()
</script>

<template>
  <div class="channel-card tile">
    <DefaultThumbnail class="thumbnail" :src="channel.photo?.url"></DefaultThumbnail>
    <span class="name">{{ channel.name }}</span>
    <span class="last-message">...</span>
  </div>
</template>

<style scoped>
.channel-card {
  padding: var(--gap-size-s);
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: var(--gap-size-s);
}

.thumbnail {
  width: 3rem;
  grid-row: 1 / 3;
}
</style>
