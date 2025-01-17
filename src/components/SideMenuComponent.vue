<script setup lang="ts">
import TileElement from '@/elements/TileElement.vue';
import ButtonElement from '@/elements/ButtonElement.vue';
</script>

<template>
  <tile-element class="side-menu">
    <span class="title">Menu</span>
    <button-element class="settings-button">Settings</button-element>
  </tile-element>
</template>

<style scoped>
.side-menu {
  position: absolute;
  bottom: var(--gap);
  padding: var(--gap);
  width: 30rem;
  height: calc(100vh - (3 * var(--gap) + var(--tile-size)));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap);
  transform: translateX(calc(-100% - var(--gap)));
  transition: transform 200ms ease-out;
}

.side-menu.active {
  transform: none;
}

.title {
  font-size: var(--text-l);
}

.settings-button {
  width: 100%;
}
</style>
