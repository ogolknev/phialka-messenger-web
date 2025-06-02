<template>
  <div>
    <UISkeleton v-if="!loaded" class="w-full h-full"></UISkeleton>
    <img
      v-show="loaded"
      class="w-full h-full card"
      :src="props.src"
      :alt="props.alt"
      @load="loaded = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UISkeleton from '../skeleton/UISkeleton.vue'

const props = defineProps<{ src?: string; alt?: string }>()
const loaded = ref(false)
</script>
