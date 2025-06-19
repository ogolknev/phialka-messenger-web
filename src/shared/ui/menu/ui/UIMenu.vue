<template>
  <div class="flex-col">
    <template v-for="(entry, index) of entries" :key="entry.value">
      <div
        class="
          flex cursor-pointer items-center gap-2 rounded p-2
          hover:bg-neutral-800
        "
        @click="
          () => {
            emit('select', entry.value ?? index)
            entry.callback?.()
          }
        ">
        <Icon v-if="entry.icon" :icon="entry.icon"></Icon>
        <span>
          {{ entry.text }}
        </span>
      </div>
      <div v-if="index < entries.length - 1" class="my-2 h-[1px] bg-neutral-800"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import type { MenuEntry } from "../model/menu-entry"

const { entries } = defineProps<{ entries: MenuEntry[] }>()
const emit = defineEmits<{ select: [value: Exclude<MenuEntry["value"], undefined>] }>()
</script>
