<template>
  <div>
    <UICard>
      <template #header>
        <h1>Страница с тестами компонентов</h1>
      </template>

      <template #default>
        <h2>Кнопки</h2>

        <UIDevider>Solid</UIDevider>

        <div class="my-4 flex gap-2">
          <UIButton icon="lucide:component" variant="solid" color="primary"> Button </UIButton>
          <UIButton icon="lucide:component" variant="solid" color="secondary"> Button </UIButton>
          <UIButton icon="lucide:component" variant="solid" color="info"> Button </UIButton>
          <UIButton icon="lucide:component" variant="solid" color="success"> Button </UIButton>
          <UIButton icon="lucide:component" variant="solid" color="warning"> Button </UIButton>
          <UIButton icon="lucide:component" variant="solid" color="error"> Button </UIButton>
          <UIButton icon="lucide:component" variant="solid" color="neutral"> Button </UIButton>
        </div>

        <UIDevider>Outline</UIDevider>

        <div class="my-4 flex gap-2">
          <UIButton icon="lucide:component" variant="outline" color="primary"> Button </UIButton>
          <UIButton icon="lucide:component" variant="outline" color="secondary"> Button </UIButton>
          <UIButton icon="lucide:component" variant="outline" color="info"> Button </UIButton>
          <UIButton icon="lucide:component" variant="outline" color="success"> Button </UIButton>
          <UIButton icon="lucide:component" variant="outline" color="warning"> Button </UIButton>
          <UIButton icon="lucide:component" variant="outline" color="error"> Button </UIButton>
          <UIButton icon="lucide:component" variant="outline" color="neutral"> Button </UIButton>
        </div>

        <UIDevider>Subtle</UIDevider>

        <div class="my-4 flex gap-2">
          <UIButton icon="lucide:component" variant="subtle" color="primary"> Button </UIButton>
          <UIButton icon="lucide:component" variant="subtle" color="secondary"> Button </UIButton>
          <UIButton icon="lucide:component" variant="subtle" color="info"> Button </UIButton>
          <UIButton icon="lucide:component" variant="subtle" color="success"> Button </UIButton>
          <UIButton icon="lucide:component" variant="subtle" color="warning"> Button </UIButton>
          <UIButton icon="lucide:component" variant="subtle" color="error"> Button </UIButton>
          <UIButton icon="lucide:component" variant="subtle" color="neutral"> Button </UIButton>
        </div>

        <UIDevider>Soft</UIDevider>

        <div class="my-4 flex gap-2">
          <UIButton icon="lucide:component" variant="soft" color="primary"> Button </UIButton>
          <UIButton icon="lucide:component" variant="soft" color="secondary"> Button </UIButton>
          <UIButton icon="lucide:component" variant="soft" color="info"> Button </UIButton>
          <UIButton icon="lucide:component" variant="soft" color="success"> Button </UIButton>
          <UIButton icon="lucide:component" variant="soft" color="warning"> Button </UIButton>
          <UIButton icon="lucide:component" variant="soft" color="error"> Button </UIButton>
          <UIButton icon="lucide:component" variant="soft" color="neutral"> Button </UIButton>
        </div>

        <UIDevider></UIDevider>

        <h2>Скелетон</h2>

        <UIDevider></UIDevider>

        <UISkeleton></UISkeleton>

        <UIDevider></UIDevider>

        <h2>Изображение</h2>

        <UIDevider></UIDevider>

        <UIImage
          class="h-40 w-40"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.j53Kbnvm9NPJxFE-BQRiaQHaE7%26pid%3DApi&f=1&ipt=66b0206eee6e1cf7d64f913f47234376da9364ad203c38ef5765b93a7cafaeec&ipo=images"
        ></UIImage>

        <UIDevider></UIDevider>

        <h2>Инпуты</h2>

        <UIDevider>Outline</UIDevider>

        <div class="grid grid-cols-2 gap-2">
          <UIInput
            v-for="color of UIComponentColorList"
            :key="color"
            v-model="inputModel"
            placeholder="Search..."
            :color="color"
            variant="outline"
          >
            <template #leading>
              <Icon icon="lucide:search" class="ml-2"></Icon>
            </template>
            <template v-if="inputModel.trim()" #trailing>
              <Icon
                icon="lucide:x"
                class="mr-2 cursor-pointer hover:text-error-400"
                @click="clearInputModel"
              ></Icon>
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
            variant="subtle"
          >
            <template #leading>
              <Icon icon="lucide:search" class="ml-2"></Icon>
            </template>
            <template v-if="inputModel.trim()" #trailing>
              <Icon
                icon="lucide:x"
                class="mr-2 cursor-pointer hover:text-error-400"
                @click="clearInputModel"
              ></Icon>
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
            variant="soft"
          >
            <template #leading>
              <Icon icon="lucide:search" class="ml-2"></Icon>
            </template>
            <template v-if="inputModel.trim()" #trailing>
              <Icon
                icon="lucide:x"
                class="mr-2 cursor-pointer hover:text-error-400"
                @click="clearInputModel"
              ></Icon>
            </template>
          </UIInput>
        </div>

        <UIDevider>Date</UIDevider>

        <UIInput
          class="w-60"
          v-model="dateInputModel"
          variant="soft"
          type="date"
          placeholder="Birthdate..."
        >
          <template #leading><Icon class="ml-2" icon="lucide:calendar"></Icon></template>
        </UIInput>

        <UIDevider>File</UIDevider>

        <UIInput class="w-60" variant="outline" type="file">
          <template #leading><Icon class="ml-2" icon="lucide:paperclip"></Icon></template>
        </UIInput>
      </template>
    </UICard>
  </div>
</template>

<script setup lang="ts">
import { UIButton, UICard, UIDevider, UIImage, UIInput, UISkeleton } from "@/shared"
import { UIComponentColorList } from "@/shared/ui/types"
import { Icon } from "@iconify/vue"
import { ref } from "vue"

const inputModel = ref("")
function clearInputModel() {
  inputModel.value = ""
}

const dateInputModel = ref("")
</script>
