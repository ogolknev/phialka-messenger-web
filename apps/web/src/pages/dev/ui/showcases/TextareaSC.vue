<template>
  <div>
    <h2>Textarea</h2>

    <UIDevider>Outline</UIDevider>

    <div class="grid grid-cols-2 gap-2">
      <UITextarea
        v-for="color of UIComponentColorList"
        :key="color"
        placeholder="Search..."
        :color="color"
        icon="lucide:book-open-text"
        variant="outline"
        highlight></UITextarea>
    </div>

    <UIDevider>Subtle</UIDevider>

    <div class="grid grid-cols-2 gap-2">
      <UITextarea
        v-for="color of UIComponentColorList"
        :key="color"
        placeholder="Search..."
        :color="color"
        icon="lucide:book-open-text"
        variant="subtle"
        highlight></UITextarea>
    </div>

    <UIDevider>Soft</UIDevider>

    <div class="grid grid-cols-2 gap-2">
      <UITextarea
        v-for="color of UIComponentColorList"
        :key="color"
        placeholder="Search..."
        :color="color"
        icon="lucide:book-open-text"
        variant="soft"></UITextarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UIComponentColorList, UIDevider, UITextarea } from "@/shared"
</script>
