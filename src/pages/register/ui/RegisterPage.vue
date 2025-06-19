<template>
  <div class="grid size-full grid-cols-1 place-items-center">
    <UICard class="card w-full max-w-100 bg-neutral-900 p-4">
      <template #header>
        <span class="text-2xl font-bold text-primary-500">Register</span>
      </template>
      <RegisterForm></RegisterForm>
    </UICard>
  </div>
</template>

<script setup lang="ts">
import { RegisterForm } from "@/features"
import { UICard } from "@/shared"
</script>
