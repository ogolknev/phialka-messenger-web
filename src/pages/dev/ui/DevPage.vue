<template>
  <div class="h-full overflow-auto">
    <UICard>
      <template #header>
        <h1>Страница с тестами компонентов</h1>
      </template>

      <template #default>
        <ButtonsSC></ButtonsSC>

        <UIDevider></UIDevider>

        <PopoverSC></PopoverSC>

        <UIDevider></UIDevider>

        <SkeletonSC></SkeletonSC>

        <UIDevider></UIDevider>

        <ImageSC></ImageSC>

        <UIDevider></UIDevider>

        <InputsSC></InputsSC>

        <UIDevider></UIDevider>

        <TextareaSC></TextareaSC>

        <UIDevider></UIDevider>

        <MenuSC></MenuSC>
      </template>
    </UICard>
  </div>
</template>

<script setup lang="ts">
import { UICard, UIDevider } from "@/shared"
import ButtonsSC from "./showcases/ButtonsSC.vue"
import PopoverSC from "./showcases/PopoverSC.vue"
import SkeletonSC from "./showcases/SkeletonSC.vue"
import ImageSC from "./showcases/ImageSC.vue"
import InputsSC from "./showcases/InputsSC.vue"
import MenuSC from "./showcases/MenuSC.vue"
import TextareaSC from "./showcases/TextareaSC.vue"
</script>
