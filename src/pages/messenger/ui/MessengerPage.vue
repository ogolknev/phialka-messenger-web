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
}
</style>
