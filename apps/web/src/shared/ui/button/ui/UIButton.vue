<template>
  <button
    class="card button flex cursor-pointer items-center justify-center gap-1.5
      p-2"
    :type="type"
    :class="` ${variant}-variant ${color}-color `"
    @click="onClick">
    <div v-if="$slots.leading || icon">
      <Icon v-if="icon" :icon="icon"></Icon>
      <slot name="leading"></slot>
    </div>

    <slot></slot>

    <div v-if="$slots.trailing">
      <slot name="trailing"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import type { UIComponentColor } from "@/shared"
import { useRouter, type RouteLocationRaw } from "vue-router"
import type { UIButtonVariant } from "../model/ui-button-variant"

import "../style/main.css"

const router = useRouter()
const {
  color = "neutral",
  variant = "subtle",
  type = "button",
  to,
  icon,
} = defineProps<{
  color?: UIComponentColor
  variant?: UIButtonVariant
  icon?: string
  to?: RouteLocationRaw
  type?: "button" | "submit" | "reset"
}>()
const emit = defineEmits<{ click: [ev: MouseEvent] }>()

function onClick(ev: MouseEvent) {
  if (to) router.push(to)
  emit("click", ev)
}
</script>
