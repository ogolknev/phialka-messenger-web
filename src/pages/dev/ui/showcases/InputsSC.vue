<template>
  <div>
    <h2>Инпуты</h2>

    <UIDevider>Outline</UIDevider>

    <div class="grid grid-cols-2 gap-2">
      <UIInput
        v-for="color of UIComponentColorList"
        :key="color"
        v-model="inputModel"
        placeholder="Search..."
        :color="color"
        variant="outline">
        <template #leading>
          <Icon icon="lucide:search"></Icon>
        </template>
        <template v-if="inputModel.trim()" #trailing>
          <Icon
            icon="lucide:x"
            class="
              mr-2 cursor-pointer
              hover:text-error-400
            "
            @click="clearInputModel"></Icon>
        </template>
      </UIInput>
    </div>

    <UIDevider>Subtle</UIDevider>

    <div class="grid grid-cols-2 gap-2">
      <UIInput
        v-for="color of UIComponentColorList"
        :key="color"
        v-model="inputModel"
        placeholder="Search..."
        :color="color"
        variant="subtle">
        <template #leading>
          <Icon icon="lucide:search"></Icon>
        </template>
        <template v-if="inputModel.trim()" #trailing>
          <Icon
            icon="lucide:x"
            class="
              mr-2 cursor-pointer
              hover:text-error-400
            "
            @click="clearInputModel"></Icon>
        </template>
      </UIInput>
    </div>

    <UIDevider>Soft</UIDevider>

    <div class="grid grid-cols-2 gap-2">
      <UIInput
        v-for="color of UIComponentColorList"
        :key="color"
        v-model="inputModel"
        placeholder="Search..."
        :color="color"
        variant="soft">
        <template #leading>
          <Icon icon="lucide:search"></Icon>
        </template>
        <template v-if="inputModel.trim()" #trailing>
          <Icon
            icon="lucide:x"
            class="
              mr-2 cursor-pointer
              hover:text-error-400
            "
            @click="clearInputModel"></Icon>
        </template>
      </UIInput>
    </div>

    <UIDevider>Date</UIDevider>

    {{ dateInputModel }}
    <UIInput
      class="w-60"
      v-model="dateInputModel"
      variant="soft"
      type="date"
      placeholder="Birthdate...">
      <template #leading><Icon icon="lucide:calendar"></Icon></template>
    </UIInput>

    <UIDevider>File</UIDevider>

    <UIInput class="w-60" variant="outline" type="file">
      <template #leading><Icon icon="lucide:paperclip"></Icon></template>
    </UIInput>
  </div>
</template>

<script setup lang="ts">
import { UIDevider, UIInput } from "@/shared"
import { UIComponentColorList } from "@/shared"
import { Icon } from "@iconify/vue"
import { ref } from "vue"

const inputModel = ref("")
function clearInputModel() {
  inputModel.value = ""
}

const dateInputModel = ref("")
</script>
