<script setup lang="ts">
import AppHeaderModule from './components/modules/AppHeader.vue'
import AppOverlayModule from './components/modules/AppOverlay.vue'
</script>

<template>
  <AppHeaderModule></AppHeaderModule>
  <main>
    <RouterView></RouterView>
  </main>
  <AppOverlayModule></AppOverlayModule>
</template>

<style>
#app {
  position: relative;
  box-sizing: border-box;
  padding: var(--gap);
  display: grid;
  grid-template-rows: var(--tile-size) 1fr;
  gap: var(--gap);
  overflow: hidden;
}
</style>

<style scoped></style>
