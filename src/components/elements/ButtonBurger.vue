<script setup lang="ts">
const { active = false } = defineProps<{ active: boolean }>()
</script>

<template>
  <div class="tile button button-burger" :class="{ active }">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.button-burger {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(var(--tile-size) * 0.12);
  cursor: pointer;
  transition: border-color var(--anim-fade);
}

.button-burger:hover {
  border-color: var(--accent-0);

  .line {
    background-color: var(--accent-0);
  }
}

.button-burger.active {

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
  height: var(--icon-width);
  background-color: var(--icon-clr);
  border-radius: calc(var(--icon-width) * 0.5);
  transition:
    background-color var(--anim-fade),
    transform var(--anim-fade)
}

.line:nth-child(3) {
  position: absolute;
}
</style>
