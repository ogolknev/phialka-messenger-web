<script setup lang="ts">
import TileElement from './TileElement.vue';
</script>

<template>
  <tile-element tabindex="0" class="button button-element">
    <slot>Button</slot>
  </tile-element>
</template>

<style scoped>

  .button-element {
    --accent-btn: var(--accent);
  }

  .button-element.success {
    --accent-btn: var(--success);
  }

  .button-element.warning {
    --accent-btn: var(--warning);
  }

  .button-element.danger {
    --accent-btn: var(--danger);
  }

  .button-element {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: var(--gap);
    padding-block: calc(var(--gap) / 2);
    color: var(--text);
    cursor: pointer;
    user-select: none;
    transition:
      color 200ms ease-out,
      border-color 200ms ease-out;
  }

  .button-element:hover,
  .button-element:focus {
    color: var(--accent-btn);
    border-color: var(--accent-btn);
  }
</style>
