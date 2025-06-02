<template>
  <button
    type="button"
    class="btn p-1.5 cursor-pointer flex items-center gap-1.5"
    :class="`var-${variant} clr-${color}`"
    @click="onClick"
  >
    <Icon v-if="icon" :icon="icon"></Icon>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { UIButtonVariant, UIComponentColor } from '../types'
import { useRouter, type RouteLocationRaw } from 'vue-router'

const router = useRouter()
const {
  color = 'neutral',
  variant = 'subtle',
  to,
  icon,
} = defineProps<{
  color?: UIComponentColor
  variant?: UIButtonVariant
  icon?: string
  to?: RouteLocationRaw
}>()

function onClick() {
  if (to) router.push(to)
}
</script>
