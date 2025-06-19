<template>
  <div class="card bg-neutral-900 p-2">
    <span>{{ message.content }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "../model"

const { message } = defineProps<{ message: Message }>()
</script>
