<template>
  <div class="grid size-full place-items-center">
    <UICard class="w-full max-w-100">
      <template #header>
        <div class="flex justify-between">
          <span class="text-primary-500 text-2xl font-bold">Server create</span>
          <UIButton
            variant="ghost"
            color="error"
            icon="lucide:x"
            @click="router.back()"></UIButton>
        </div>
      </template>

      <ServerCreateForm></ServerCreateForm>
    </UICard>
  </div>
</template>

<script setup lang="ts">
import { ServerCreateForm } from "@/features"
import { UICard } from "@/shared"
import UIButton from "@/shared/ui/button/ui/UIButton.vue"
import { useRouter } from "vue-router"

const router = useRouter()
</script>
