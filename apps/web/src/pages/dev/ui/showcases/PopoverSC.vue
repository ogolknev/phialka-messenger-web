<template>
  <div>
    <h2>Popover</h2>

    <UIDevider></UIDevider>

    <UIPopoverWrapper v-model="openPopover">
      <template #trigger>
        <UIButton
          icon="lucide:chevron-down"
          color="info"
          @click="openPopover = openPopover ? false : true">
          Popover
        </UIButton>
      </template>
      <template #popover>
        <UICard>
          <template #header>
            <h4>Popover</h4>
          </template>
          <template #default>
            <UIMenu
              :entries="[
                { text: 'Edit', icon: 'lucide:edit' },
                { text: 'Remove', icon: 'lucide:trash' },
                { text: 'Close', icon: 'lucide:x', callback: () => (openPopover = false) },
              ]"></UIMenu>
          </template>
        </UICard>
      </template>
    </UIPopoverWrapper>
  </div>
</template>

<script setup lang="ts">
import { UIButton, UIDevider, UIMenu, UIPopoverWrapper, UICard } from "@/shared"
import { ref } from "vue"

const openPopover = ref(false)
</script>
