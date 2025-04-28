<script setup lang='ts'>
import { ChannelCard, useChannelStore } from '@/entities';
import { AddButton } from '@/shared';

const channelStore = useChannelStore()
</script>

<template>
  <div class="channel-list-widget">
    <ChannelCard v-for="channel in channelStore.channels" :key="channel.id" :channel="channel"></ChannelCard>
    <AddButton class="add-channel-button"></AddButton>
  </div>
</template>

<style scoped>
.add-channel-button {
  height: 3rem;
}
</style>
