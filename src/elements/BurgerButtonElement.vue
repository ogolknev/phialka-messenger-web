<script setup lang="ts">
import TileElement from './TileElement.vue';
</script>

<template>
  <tile-element class="burger-button">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </tile-element>
</template>

<style scoped>
.burger-button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: border-color 200ms ease-out;
}

.burger-button:hover {
  border-color: var(--accent);

  .line {
    background-color: var(--accent);
  }
}

.burger-button.active {
  .line:nth-child(1),
  .line:nth-child(4) {
    transform: scaleX(0);
  }

  .line:nth-child(2) {
    transform: rotate(45deg);
  }

  .line:nth-child(3) {
    transform: rotate(-45deg);
  }
}

.line {
  width: 50%;
  height: 2px;
  background-color: var(--icon);
  border-radius: 1px;
  transition:
    background-color 200ms ease-out,
    transform 200ms ease-out;
}

.line:nth-child(3) {
  position: absolute;
}


</style>
