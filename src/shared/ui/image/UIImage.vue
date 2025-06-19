<template>
  <div class="card overflow-hidden">
    <UISkeleton v-if="!loaded"></UISkeleton>
    <img
      class="size-full object-cover"
      :class="{ invisible: !loaded }"
      :src="props.src ?? undefined"
      :alt="props.alt"
      @load="loaded = true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import UISkeleton from "../skeleton/UISkeleton.vue"

const props = defineProps<{ src?: string | null; alt?: string }>()
const loaded = ref(false)
</script>
