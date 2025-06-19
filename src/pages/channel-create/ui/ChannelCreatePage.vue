<template>
  <div class="grid size-full place-content-center">
    <UICard class="relative min-w-80">
      <template #header>
        <div class="flex justify-between gap-2">
          <span class="text-primary-500 text-2xl font-bold">
            CREATE CHANNEL
          </span>
          <UIButton
            class="absolute top-1 right-1"
            variant="ghost"
            color="error"
            icon="lucide:x"
            @click="router.back()"></UIButton>
        </div>
      </template>
      <ChannelCreateForm></ChannelCreateForm>
    </UICard>
  </div>
</template>

<script setup lang="ts">
import { ChannelCreateForm } from "@/features"
import { UICard } from "@/shared"
import UIButton from "@/shared/ui/button/ui/UIButton.vue"
import { useRouter } from "vue-router"

const router = useRouter()
</script>
