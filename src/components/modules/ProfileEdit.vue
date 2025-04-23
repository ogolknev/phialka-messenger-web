<script setup lang="ts">
import CloseButtonElement from '../elements/ButtonClose.vue'
import ProfileEditFormComponent from '@/components/components/FormProfileEdit.vue'
import CropImageComponent from '@/components/components/ImageCropper.vue'
import { computed, ref } from 'vue'
import { formatDate, getCanvasBlob } from '@/shared/utils/shared'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { api } from '@/shared'
import { normalizeFile } from '@/adapters'

const router = useRouter()
const store = useStore()
const newProfilePhotoCroppedCanvas = ref<HTMLCanvasElement>()
const newProfilePhotoURL = ref<string>()
const newProfilePhotoURLCropped = ref<string>()
const newProfileForm = ref<{
  name: string
  tag: string
  birthdate: string
  description: string
}>({
  name: '',
  tag: '',
  birthdate: '',
  description: '',
})

if (store.profile) {
  newProfileForm.value = {
    name: store.profile.name ?? '',
    tag: store.profile.tag ?? '',
    birthdate: formatDate(store.profile.birthdate?.toISOString(), 'yyyy-mm-dd', 'dd.mm.yyyy') ?? '',
    description: store.profile.description ?? ''
  }
  console.log(store.profile.birthdate)
  console.log(store.profile.birthdate?.toISOString())
  console.log(newProfileForm.value.birthdate)
}

const profilePhoto = computed(() => {
  if (newProfilePhotoURLCropped.value) return newProfilePhotoURLCropped.value
  if (store.profile?.photo?.downloadId)
    return '/api/files/download/' + store.profile?.photo.downloadId
  throw new Error(`Нет фото профиля: ${JSON.stringify(store.profile)}`)
})

function onNewProfilePhotoLoad(url: string) {
  newProfilePhotoURL.value = url
  addEventListener('keydown', onKeydown)
}

function onNewProfilePhotoCrop(canvas?: HTMLCanvasElement) {
  if (!canvas) return
  newProfilePhotoURLCropped.value = canvas.toDataURL()
  newProfilePhotoURL.value = undefined
  newProfilePhotoCroppedCanvas.value = canvas
}

function clearNewProfilePhotoUrl() {
  newProfilePhotoURL.value = undefined
  removeEventListener('keydown', onKeydown)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    clearNewProfilePhotoUrl()
  }
}

async function onSubmit() {
  console.log(JSON.stringify(newProfileForm.value))
  await api.profile.editProfileProfilePatch({
    userUpdate: {
      ...newProfileForm.value,
      ...{ birthdate: new Date(newProfileForm.value.birthdate ?? '') ?? undefined },
    }
  })
  if (newProfilePhotoCroppedCanvas.value) {
    const blob = await getCanvasBlob(newProfilePhotoCroppedCanvas.value)
    await api.profile.setProfilePhotoProfilePhotoPut({ photo: blob })
  }
  const apiProfile = await api.profile.getProfileProfileGet()
  apiProfile.photo = normalizeFile(apiProfile.photo)
  store.profile = apiProfile
}

function onRemove() {
  store.toasts.push("It's not working yet (0_o)")
}

function onClose() {
  router.push('/')
}
</script>

<template>
  <div class="profile-edit">
    <header>
      <div class="tile title">Profile</div>
      <close-button-element @click="onClose"></close-button-element>
    </header>
    <profile-edit-form-component v-model:name="newProfileForm.name" v-model:tag="newProfileForm.tag"
      v-model:birthdate="newProfileForm.birthdate" v-model:description="newProfileForm.description"
      :image-url="profilePhoto" @photo-load="onNewProfilePhotoLoad" @submit="onSubmit"
      @remove="onRemove"></profile-edit-form-component>
    <teleport to=".app-overlay">
      <crop-image-component v-if="newProfilePhotoURL" :src="newProfilePhotoURL"
        @crop="onNewProfilePhotoCrop"></crop-image-component>
    </teleport>
  </div>
</template>

<style scoped>
.profile-edit {
  position: relative;
  margin-inline: auto;
  max-width: var(--max-content-width);
  width: 80%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap);
}

header {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--gap);

  .title {
    width: fit-content;
    flex-grow: 1;
    min-height: var(--tile-size);
    height: fit-content;
    padding-inline: var(--gap);
    font-size: var(--text-m);
    display: grid;
    place-content: center;
    border-color: var(--warning-0);
    color: var(--warning-0);
  }
}

.profile-edit-form-component {
  width: 100%;
}

.crop-image-component {
  width: 40rem;
  height: fit-content;
  padding: var(--gap);
}
</style>
