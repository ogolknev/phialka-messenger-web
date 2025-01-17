<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';

import TileElement from '@/elements/TileElement.vue';
import BurgerButtonElement from '@/elements/BurgerButtonElement.vue';
import SignInButtonElement from '@/elements/SignInButtonElement.vue';
import SideMenuComponent from './SideMenuComponent.vue';
import ProfilePhotoElement from '@/elements/ProfilePhotoElement.vue';
import ProfileSideMenuComponent from './ProfileSideMenuComponent.vue';

const isSideMenuActive = ref(false)
const isProfileSideMenuActive = ref(false)
const router = useRouter()
const appStore = useAppStore()

function toggleSideMenu() {
  if (isSideMenuActive.value) {
    isSideMenuActive.value = false
  } else {
    isSideMenuActive.value = true
  }
}

function toggleProfileSideMenu() {
  if (isProfileSideMenuActive.value) {
    isProfileSideMenuActive.value = false
  } else {
    isProfileSideMenuActive.value = true
  }
}
</script>

<template>
  <header class="main-header-component">
    <burger-button-element
      @click="toggleSideMenu"
      :class="{ active: isSideMenuActive }"
    ></burger-button-element>
    <side-menu-component :class="{ active: isSideMenuActive }"></side-menu-component>
    <tile-element
      class="title"
      @click="router.push('/')"
    >Phialka</tile-element>
    <tile-element class="header-spacer"></tile-element>
    <profile-photo-element v-if="appStore.isAuth" @click="toggleProfileSideMenu"></profile-photo-element>
    <sign-in-button-element v-else @click="router.push('/auth')"></sign-in-button-element>
    <profile-side-menu-component :active="isProfileSideMenuActive && appStore.isAuth"></profile-side-menu-component>
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
</style>
