<template>
  <div class="layout grid h-dvh grid-rows-[3rem_1fr] p-2 gap-2 overflow-hidden">
    <header>
      <AppHeader></AppHeader>
    </header>
    <main class="overflow-auto">
      <slot name="default"></slot>
    </main>
    <aside class="absolute">
      <slot name="aside"></slot>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { AppHeader } from '@/widgets'
</script>
