<script setup lang="ts">
import DefaultButton from './DefaultButton.vue'
import { AttachmentIcon } from '../icon'
</script>

<template>
  <DefaultButton class="attachment-button">
    <AttachmentIcon class="attachment-icon"></AttachmentIcon>
  </DefaultButton>
</template>

<style scoped>
.attachment-button {
  padding: var(--gap-size-l);
  display: flex;
  justify-content: center;
}

.attachment-icon {
  aspect-ratio: 1;
  max-height: 100%;
  max-width: 100%;
}
</style>
