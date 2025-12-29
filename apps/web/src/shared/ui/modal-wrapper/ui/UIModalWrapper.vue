<template>
  <UIOverlayWrapper v-if="open" backdrop-darken>
    <div
      ref="container"
      class="pointer-events-auto absolute inset-1/2 size-fit -translate-1/2">
      <slot></slot>
    </div>
  </UIOverlayWrapper>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue"
import { UIOverlayWrapper } from "../../overlay-wrapper"
import { useClickOutside } from "@/shared/lib"

const open = defineModel<boolean>()
const { closeOnClickOutside = true } = defineProps<{
  closeOnClickOutside?: boolean
}>()

const conatinerRef = useTemplateRef("container")

useClickOutside(conatinerRef, () => {
  if (open.value && closeOnClickOutside) open.value = false
})
</script>
