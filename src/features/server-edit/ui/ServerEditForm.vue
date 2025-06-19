<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
    <div class="grid grid-cols-[auto_minmax(0,1fr)] grid-rows-3 gap-3">
      <UIImage class="row-start-1 row-end-3 size-25" :src="logoSrc"></UIImage>
      <UIInput
        placeholder="Pick logo"
        type="file"
        icon="lucide:image"
        variant="soft"
        color="primary"
        @change="onLogoLoad"></UIInput>
      <UIModalWrapper v-if="logoSrcBeforeCrop" v-model="openCropperModal">
        <div class="card bg-neutral-900 p-2">
          <UICropper
            class="size-80"
            :src="logoSrcBeforeCrop"
            @crop="onLogoCrop"></UICropper>
        </div>
      </UIModalWrapper>

      <UIInput
        v-model="name"
        placeholder="Title..."
        icon="lucide:tag"
        color="primary"></UIInput>

      <UITextarea
        v-model="description"
        class="col-span-full"
        placeholder="Description..."
        icon="lucide:text"
        max-rows="3"
        color="primary"></UITextarea>
    </div>

    <div class="flex justify-end gap-2">
      <UIButton color="error" icon="lucide:circle-x" @click="router.back">
        Cancel
      </UIButton>
      <UIButton type="submit" color="primary" icon="lucide:circle-plus">
        Edit
      </UIButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  UICropper,
  UIImage,
  UIInput,
  UIModalWrapper,
  UITextarea,
  useAPI,
} from "@/shared"
import UIButton from "@/shared/ui/button/ui/UIButton.vue"
import { onBeforeUnmount, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { editServer } from "../api/edit-server"
import { useServerStore } from "@/entities"

const router = useRouter()
const route = useRoute("server-edit")

const serverStore = useServerStore()

const logo = ref<Blob | null>(null)
const logoSrc = ref<string | null>(null)
const logoSrcBeforeCrop = ref<string | null>(null)

const name = ref("")
const description = ref("")

const openCropperModal = ref(false)

const editServerRequest = useAPI(editServer)
async function onSubmit() {
  await editServerRequest.execute({
    serverId: route.params.serverId,
    photo: logo.value,
    name: name.value,
    description: description.value,
  })
  if (!editServerRequest.error.value) router.back()
}

function onLogoCrop(file: Blob) {
  cleanObjectURL(logoSrc.value)
  cleanObjectURL(logoSrcBeforeCrop.value)

  logo.value = file
  logoSrc.value = URL.createObjectURL(file)
  openCropperModal.value = false
}

function onLogoLoad(file: Blob) {
  cleanObjectURL(logoSrcBeforeCrop.value)

  logoSrcBeforeCrop.value = URL.createObjectURL(file)
  openCropperModal.value = true
}

function cleanObjectURL(url: string | null) {
  if (url) URL.revokeObjectURL(url)
}

onMounted(() => {
  const server = serverStore.getServerById(route.params.serverId)
  if (!server) return

  logoSrc.value = server.photo?.url ?? null
  name.value = server.name
  description.value = server.description
})

onBeforeUnmount(() => {
  cleanObjectURL(logoSrc.value)
  cleanObjectURL(logoSrcBeforeCrop.value)
})
</script>
