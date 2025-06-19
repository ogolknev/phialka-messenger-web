<template>
  <div>
    <h2>Menu</h2>

    <UIDevider></UIDevider>

    <UIMenu
      class="w-full"
      :entries="[
        { text: 'Component', value: 'first', icon: 'lucide:component' },
        { text: 'Menu', icon: 'lucide:menu' },
        { text: 'Drama', icon: 'lucide:drama' },
      ]"
      @select="(value) => console.log(value)"></UIMenu>
  </div>
</template>

<script setup lang="ts">
import { UIDevider, UIMenu } from "@/shared"
</script>
