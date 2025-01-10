<script setup>
import TileElement from '@/elements/TileElement.vue';
import ButtonElement from '@/elements/ButtonElement.vue';
</script>

<template>
  <tile-element class="profile-side-menu">
    <span class="name">Name</span>
    <div class="button-container">
      <button-element class="danger">Sign Out</button-element>
      <button-element class="warning">Edit</button-element>
    </div>
  </tile-element>
</template>

<style scoped>
.profile-side-menu {
  position: absolute;
  top: calc(2 * var(--gap) + var(--tile-size));
  right: var(--gap);
  padding: var(--gap);
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  transform: translateX(calc(100% + var(--gap)));
  transition: transform 200ms ease-out;
}

.profile-side-menu.active {
  transform: none;
}

.name {
  font-size: var(--text-m);
}

.button-container {
  display: flex;
  gap: var(--gap);
  justify-content: space-between;
}
</style>
