<template>
  <div class="grid h-dvh grid-rows-[4rem_1fr] gap-2 overflow-hidden p-2">
    <header>
      <AppHeader></AppHeader>
    </header>
    <main class="overflow-hidden">
      <slot name="default"></slot>
    </main>
    <aside class="absolute">
      <slot name="aside"></slot>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { AppHeader } from "@/widgets"
</script>
