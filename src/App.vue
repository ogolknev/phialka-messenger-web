<script setup lang="ts">
import AppHeaderModule from './modules/AppHeaderModule.vue';
import AppOverlayModule from './modules/AppOverlayModule.vue';


</script>

<template>
  <app-header-module></app-header-module>
  <main>
    <router-view></router-view>
  </main>
  <app-overlay-module></app-overlay-module>
</template>

<style>
#app {
  position: relative;
  box-sizing: border-box;
  padding: var(--gap);
  display: grid;
  grid-template-rows: var(--tile-size) calc(100% - var(--tile-size) - var(--gap));
  gap: var(--gap);
  overflow: hidden;
}
</style>

<style scoped>
</style>
