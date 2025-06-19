<template>
  <div>
    <h2>Кнопки</h2>

    <UIDevider>Solid</UIDevider>

    <div class="my-4 flex gap-2">
      <UIButton icon="lucide:component" variant="solid" color="primary">Button</UIButton>
      <UIButton icon="lucide:component" variant="solid" color="secondary">Button</UIButton>
      <UIButton icon="lucide:component" variant="solid" color="info">Button</UIButton>
      <UIButton icon="lucide:component" variant="solid" color="success">Button</UIButton>
      <UIButton icon="lucide:component" variant="solid" color="warning">Button</UIButton>
      <UIButton icon="lucide:component" variant="solid" color="error">Button</UIButton>
      <UIButton icon="lucide:component" variant="solid" color="neutral">Button</UIButton>
    </div>

    <UIDevider>Outline</UIDevider>

    <div class="my-4 flex gap-2">
      <UIButton icon="lucide:component" variant="outline" color="primary">Button</UIButton>
      <UIButton icon="lucide:component" variant="outline" color="secondary">Button</UIButton>
      <UIButton icon="lucide:component" variant="outline" color="info">Button</UIButton>
      <UIButton icon="lucide:component" variant="outline" color="success">Button</UIButton>
      <UIButton icon="lucide:component" variant="outline" color="warning">Button</UIButton>
      <UIButton icon="lucide:component" variant="outline" color="error">Button</UIButton>
      <UIButton icon="lucide:component" variant="outline" color="neutral">Button</UIButton>
    </div>

    <UIDevider>Subtle</UIDevider>

    <div class="my-4 flex gap-2">
      <UIButton icon="lucide:component" variant="subtle" color="primary">Button</UIButton>
      <UIButton icon="lucide:component" variant="subtle" color="secondary">Button</UIButton>
      <UIButton icon="lucide:component" variant="subtle" color="info">Button</UIButton>
      <UIButton icon="lucide:component" variant="subtle" color="success">Button</UIButton>
      <UIButton icon="lucide:component" variant="subtle" color="warning">Button</UIButton>
      <UIButton icon="lucide:component" variant="subtle" color="error">Button</UIButton>
      <UIButton icon="lucide:component" variant="subtle" color="neutral">Button</UIButton>
    </div>

    <UIDevider>Soft</UIDevider>

    <div class="my-4 flex gap-2">
      <UIButton icon="lucide:component" variant="soft" color="primary">Button</UIButton>
      <UIButton icon="lucide:component" variant="soft" color="secondary">Button</UIButton>
      <UIButton icon="lucide:component" variant="soft" color="info">Button</UIButton>
      <UIButton icon="lucide:component" variant="soft" color="success">Button</UIButton>
      <UIButton icon="lucide:component" variant="soft" color="warning">Button</UIButton>
      <UIButton icon="lucide:component" variant="soft" color="error">Button</UIButton>
      <UIButton icon="lucide:component" variant="soft" color="neutral">Button</UIButton>
    </div>

    <UIDevider>Ghost</UIDevider>

    <div class="my-4 flex gap-2">
      <UIButton icon="lucide:component" variant="ghost" color="primary">Button</UIButton>
      <UIButton icon="lucide:component" variant="ghost" color="secondary">Button</UIButton>
      <UIButton icon="lucide:component" variant="ghost" color="info">Button</UIButton>
      <UIButton icon="lucide:component" variant="ghost" color="success">Button</UIButton>
      <UIButton icon="lucide:component" variant="ghost" color="warning">Button</UIButton>
      <UIButton icon="lucide:component" variant="ghost" color="error">Button</UIButton>
      <UIButton icon="lucide:component" variant="ghost" color="neutral">Button</UIButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UIButton, UIDevider } from "@/shared"
</script>
