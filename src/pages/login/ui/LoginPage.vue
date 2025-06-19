<template>
  <div class="grid size-full grid-cols-1 place-items-center">
    <UICard class="w-full max-w-100 bg-neutral-900 p-4">
      <template #header>
        <span class="text-primary-500 text-2xl font-bold">Login</span>
      </template>

      <LoginForm></LoginForm>
    </UICard>
  </div>
</template>

<script setup lang="ts">
import { LoginForm } from "@/features"
import { UICard } from "@/shared"
</script>
