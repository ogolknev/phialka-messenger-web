<script setup lang='ts'>
import InputPhoto from '../elements/InputPhoto.vue';
import InputText from '../elements/InputText.vue';
import ButtonDefault from '../elements/ButtonDefault.vue';


const title = defineModel('title', { type: String, required: true })
const description = defineModel('description', { type: String, required: true })
const emit = defineEmits<{
  (ev: 'icon-load', url: string): void
  (ev: 'click-create'): void
}>()
const { src } = defineProps<{ src?: string }>()

function onPhotoLoad(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      emit('icon-load', event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }
}

function onClickCreate() {
  emit('click-create')
}
</script>

<template>
  <div class="form-server-create">
    <InputPhoto class="input-photo" :src="src" @change="onPhotoLoad" color='success'></InputPhoto>
    <InputText class="input-text tite-input" v-model="title" placeholder="Title..." color='success'></InputText>
    <InputText class="input-text description-input" v-model="description" placeholder="Description..." color='success'
      maxrows="5" rows="5" maxlength="200"></InputText>
    <div class="buttons-container">
      <ButtonDefault color='success' @click="onClickCreate">Create</ButtonDefault>
    </div>
  </div>
</template>

<style scoped>
.form-server-create {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  gap: var(--gap);
}

.input-text {
  width: 100%;
}

.description-input,
.buttons-container {
  grid-column: 1 / 3;
}

.buttons-container {
  display: flex;
  flex-flow: row-reverse;
}
</style>
