<script setup lang="ts">
import ButtonElement from '@/elements/ButtonElement.vue';
</script>

<template>
  <div class="tile side-menu">
    <span class="title">Menu</span>
    <button-element class="settings-button">Settings</button-element>
  </div>
</template>

<style scoped>
.side-menu {
  position: absolute;
  bottom: var(--gap);
  padding: var(--gap);
  width: var(--main-menu-width);
  height: calc(100vh - (3 * var(--gap) + var(--tile-size)));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: var(--gap);
  transform: translateX(calc(-100% - var(--gap)));
  transition: transform var(--animation-appear-from-side-duration) var(--animation-appear-from-side-function);
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
