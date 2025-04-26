<script setup lang='ts'>
import { DefaultThumbnail } from '@/shared';
import type { Server } from '../model/server';

const { server } = defineProps<{ server: Server }>()

</script>

<template>
  <div class="server-tile tile">
    <DefaultThumbnail :src="server.photo?.url" class="thumbnail"></DefaultThumbnail>
  </div>
</template>

<style scoped>
.server-tile {
  width: 100%;
  aspect-ratio: 1;
  padding: var(--gap-size-s);
}

.thumbnail {
  width: 100%;
  aspect-ratio: 1;
}
</style>
