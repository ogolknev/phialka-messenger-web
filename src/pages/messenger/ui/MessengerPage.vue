<script setup lang="ts">
import { ServerListWidget } from '@/widgets';

</script>

<template>
  <div class="messenger-page">
    <ServerListWidget class="server-list tile"></ServerListWidget>
  </div>
</template>

<style scoped>
.messenger-page {
  height: 100%;
  display: grid;
  grid-template-columns: 5rem 15rem 1fr;
}

.server-list {
  background: var(--clr-bg);
  height: 100%;
  padding: var(--gap-size-s);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
  align-items: center;
  overflow-y: auto;
}
</style>
