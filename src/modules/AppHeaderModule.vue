<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import BurgerButtonElement from '@/elements/BurgerButtonElement.vue';
import SignInButtonElement from '@/elements/SignInButtonElement.vue';
import ThumbnailElement from '@/elements/ThumbnailElement.vue';

import SideMenuComponent from '@/components/SideMenuComponent.vue';
import ProfileSideMenuComponent from '@/components/ProfileSideMenuComponent.vue';
import { useStore } from '@/store';
import api from '@/api';


const router = useRouter()
const store = useStore()

const isSideMenuActive = ref(false)
const isProfileSideMenuActive = ref(false)
const profilePhoto = computed(() => {
  const download_id = store.profile?.photo?.download_id
  if (download_id) {
    return "/api/files/download/" + download_id
  }
  return "/src/assets/user.svg"
})

function sideMenuToogle() {
  if (isSideMenuActive.value) {
    isSideMenuActive.value = false
  } else {
    isSideMenuActive.value = true
  }
}
function profileSideMenuToogle() {
  if (isProfileSideMenuActive.value) {
    isProfileSideMenuActive.value = false
  } else {
    isProfileSideMenuActive.value = true
  }
}
function toProfileEdit() {
  router.push('/profile/edit')
  isProfileSideMenuActive.value = false
}
function signOut() {
  api.auth.signOut()
  store.profile = null
  isProfileSideMenuActive.value = false
  router.push('/auth')
}
</script>

<template>
  <header class="main-header-module">
    <burger-button-element
      @click="sideMenuToogle"
      :active="isSideMenuActive"
    ></burger-button-element>
    <side-menu-component :class="{ active: isSideMenuActive }"></side-menu-component>
    <div
      class="tile title"
      @click="router.push('/')"
    >Phialka</div>
    <div class="tile header-spacer"></div>
    <div
      v-if="store.profile !== null"
      class="tile profile-photo"
      @click="profileSideMenuToogle"
    >
      <thumbnail-element :src="profilePhoto"></thumbnail-element>
    </div>
    <sign-in-button-element
      v-else
      @click="router.push('/auth')"
    ></sign-in-button-element>
    <profile-side-menu-component
      @edit="toProfileEdit"
      @sign-out="signOut"
      :profile-name="store.profile?.name"
      :class="{ active: isProfileSideMenuActive && store.profile !== null }"
      :tabindex="isProfileSideMenuActive && store.profile !== null ? 0 : -1"
    ></profile-side-menu-component>
  </header>
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: var(--gap);
  z-index: 99;
}

.header-spacer {
  width: 100%;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--gap);
  width: fit-content;
  color: var(--accent);
  border-color: var(--accent);
  font-size: var(--text-xl);
  cursor: pointer;
  user-select: none;
}

.side-menu-component {
  position: absolute;
  top: calc(2 * var(--gap) + var(--tile-size));
  padding: var(--gap);
  max-width: var(--main-menu-width);
  width: calc(100% - (2 * var(--gap)));
  height: calc(100% - (3 * var(--gap) + var(--tile-size)));
  transform: translateX(calc(-100% - var(--gap)));
  transition: transform var(--animation-appear-from-side-duration) var(--animation-appear-from-side-function);
}

.side-menu-component.active {
  transform: none;
}

.profile-photo {
  cursor: pointer;
  transition: border-color var(--animation-focus-duration) var(--animation-focus-function);

  &:hover {
    border-color: var(--accent);
  }
}

.profile-side-menu {
  position: fixed;
  top: calc(2 * var(--gap) + var(--tile-size));
  right: var(--gap);
  transform: translateX(calc(100% + var(--gap)));
  transition: transform var(--animation-appear-from-side-duration) var(--animation-appear-from-side-function);
}

.profile-side-menu.active {
  transform: none;
}
</style>
