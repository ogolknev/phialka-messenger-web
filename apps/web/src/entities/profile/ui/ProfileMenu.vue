<template>
  <div>
    <UIPopoverWrapper
      v-if="profileStore.profile"
      v-model="openProfileMenu"
      not-close-on-scroll
      :disabled="!profileStore.profile">
      <template #trigger>
        <UIImage
          :src="profileStore.profile?.photo?.url ?? FALLBACK_AVATAR_SOURCE"
          class="size-10 rounded-full"
          @click="openProfileMenu = !openProfileMenu"
          @contextmenu.prevent="openProfileMenu = !openProfileMenu"></UIImage>
      </template>

      <template #popover>
        <div class="card bg-neutral-900 p-2">
          <h3 class="m-2">
            {{ profileStore.profile?.name }}
          </h3>

          <UIDevider></UIDevider>

          <UIMenu
            :entries="[
              { text: 'Edit', icon: 'lucide:square-pen' },
              { text: 'Logout', icon: 'lucide:log-out', callback: onLogout },
            ]"></UIMenu>
        </div>
      </template>
    </UIPopoverWrapper>
    <UIButton
      v-else
      icon="lucide:log-in"
      to="/login"
      color="primary"></UIButton>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from "@/entities"
import { logout } from "@/features"
import {
  UIMenu,
  UIImage,
  UIPopoverWrapper,
  useAPI,
  UIButton,
  UIDevider,
} from "@/shared"
import { ref } from "vue"
import { useRouter } from "vue-router"

const FALLBACK_AVATAR_SOURCE =
  "https://img.icons8.com/?size=100&id=ABBSjQJK83zf&format=png&color=a3a3a3"

const router = useRouter()

const openProfileMenu = ref(false)
const profileStore = useProfileStore()

const logoutRequest = useAPI(logout)
async function onLogout() {
  openProfileMenu.value = false
  await logoutRequest.execute()
  profileStore.resetProfile()
  router.push("/login")
}
</script>
