<script setup lang="ts">
import ButtonElement from '../elements/ButtonDefault.vue'
</script>

<template>
  <div class="tile menu-main">
    <span class="title">Menu</span>
    <button-element class="settings-button">Settings</button-element>
  </div>
</template>

<style scoped>
.menu-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: var(--gap);
}

.title {
  font-size: var(--text-l);
}

.settings-button {
  width: 100%;
}
</style>
