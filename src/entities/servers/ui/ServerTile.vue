<script setup lang='ts'>
import { DefaultThumbnail } from '@/shared';
import type { Server } from '../model/server';

const { server } = defineProps<{ server: Server }>()

</script>

<template>
  <div class="server-tile tile">
    <DefaultThumbnail :src="server.photo?.url"></DefaultThumbnail>
  </div>
</template>
