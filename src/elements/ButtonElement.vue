<script setup>
import TileElement from './TileElement.vue';
</script>

<template>
  <tile-element class="button button-element">
    <slot>Button</slot>
  </tile-element>
</template>

<style scoped>

  .button-element {
    --accent: var(--accent-0);
  }

  .button-element.success {
    --accent: var(--success);
  }

  .button-element.warning {
    --accent: var(--warning);
  }

  .button-element.danger {
    --accent: var(--danger);
  }

  .button-element {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: var(--gap);
    padding-block: 12px;
    cursor: pointer;
    user-select: none;
    transition:
      color 200ms ease-out,
      border-color 200ms ease-out;
  }

  .button-element:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
</style>
