<script setup lang="ts">
import { DefaultLayout } from '../layouts'
import './style/main.css'
</script>

<template>
  <div class="bg-neutral-950 text-neutral-50 text-sm">
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </div>
</template>
