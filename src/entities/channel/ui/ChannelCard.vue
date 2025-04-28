<script setup lang='ts'>
import { DefaultThumbnail } from '@/shared';
import type { Channel } from '../model/channel';

const { channel } = defineProps<{ channel: Channel }>()

</script>

<template>
  <div class="channel-card tile">
    <DefaultThumbnail :src="channel.photo?.url"></DefaultThumbnail>
    <span class="name">{{ channel.name }}</span>
    <span class="last-message">...</span>
  </div>
</template>
