<template>
  <div
    class="
      card flex h-full items-center gap-2 bg-neutral-900 px-4 text-xl font-bold text-primary-500
    ">
    <Icon icon="lucide:flower"></Icon>
    <span>PHIALKA</span>
    <div class="grow"></div>
    <ProfileMenu></ProfileMenu>
  </div>
</template>

<script setup lang="ts">
import { ProfileMenu } from "@/entities"
import { Icon } from "@iconify/vue"
</script>
