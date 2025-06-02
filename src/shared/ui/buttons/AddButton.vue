<script setup lang="ts">
import DefaultButton from './DefaultButton.vue'
import { AddIcon } from '../icon'
</script>

<template>
  <DefaultButton class="add-button">
    <AddIcon class="add-icon"></AddIcon>
  </DefaultButton>
</template>

<style scoped>
.add-button {
  padding: var(--gap-size-l);
  display: flex;
  justify-content: center;
}

.add-icon {
  aspect-ratio: 1;
  max-height: 100%;
  max-width: 100%;
}
</style>
