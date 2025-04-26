<script setup lang="ts">
import { ServerList } from '@/widgets';

</script>

<template>
  <div class="messenger-page">
    <ServerList class="server-list tile"></ServerList>
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
