<script setup lang="ts">
import { AppOverlay } from "@/widgets"
import { DefaultLayout } from "../layouts"
</script>

<template>
  <div class="bg-neutral-950 text-sm text-neutral-50">
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
    <AppOverlay></AppOverlay>
  </div>
</template>
