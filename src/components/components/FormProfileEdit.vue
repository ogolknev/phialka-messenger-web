<script setup lang='ts'>
import InputPhoto from '../elements/InputPhoto.vue';
import InputText from '../elements/InputText.vue';
import ButtonDefault from '../elements/ButtonDefault.vue';
import { useValidation } from '@/composables/validation';
import { useStore } from '@/store';


const { imageUrl } = defineProps<{ imageUrl?: string }>()
const emit = defineEmits<{
  (e: 'photo-load', url: string): void
  (e: 'submit'): void
  (e: 'remove'): void
}>()
const name = defineModel<string>('name', { required: true })
const tag = defineModel<string>('tag', { required: true })
const birthdate = defineModel<string>('birthdate', { required: true })
const description = defineModel<string>('description', { required: true })

const store = useStore()

console.log(name.value)

const validation = {
  name: useValidation(name, {
    maxLength: {
      value: 30,
      callback(value) {
        store.toasts.push(`Maximum ${value} chars in name`)
      }
    }
  }),
  tag: useValidation(tag, {
    minLength: {
      value: 3,
      callback(value) {
        store.toasts.push(`Minimum ${value} chars in tag`)
      }
    },
    maxLength: {
      value: 12,
      callback(value) {
        store.toasts.push(`Maximum ${value} chars in tag`)
      }
    }
  }),
  birthdate: useValidation(birthdate, {
    validDate: {
      callback() {
        store.toasts.push(`Birthdate must be a valid date`)
      }
    }
  }),
  description: useValidation(description, {
    maxLength: {
      value: 200,
      callback(value) {
        store.toasts.push(`Maximum ${value} chars in description`)
      }
    }
  })
}

function onChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      emit('photo-load', event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }
}

function onSubmit() {
  emit('submit')
}

function onRemove() {
  emit('remove')
}
</script>

<template>
  <div class="form-profile-edit">
    <div class="first-row-container">
      <InputPhoto :src="imageUrl" class="input-photo" color='warning' @change="onChange"></InputPhoto>
      <InputText v-model="name" class="input-text name-input" :invalid="!validation.name.isValid.value"
        placeholder="Name..." color='warning'></InputText>
      <InputText v-model="tag" class="input-text tag-input" :invalid="!validation.tag.isValid.value" placeholder="Tag..."
        color='warning'></InputText>
      <InputText v-model="birthdate" class="input-text bithdate-input" :invalid="!validation.birthdate.isValid.value"
        placeholder="Birthdate..." color='warning' date></InputText>
    </div>
    <InputText v-model="description" class="input-text description-input" :invalid="!validation.description.isValid.value"
      placeholder="Description..." color='warning' :maxrows="4" :maxlength="200"></InputText>
    <div class="buttons-container">
      <ButtonDefault color='danger' @click="onRemove">Remove</ButtonDefault>
      <ButtonDefault color='warning' @click="onSubmit">Edit</ButtonDefault>
    </div>
  </div>
</template>

<style scoped>
.form-profile-edit {
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap);
  scrollbar-width: none;
}

.form-profile-edit::-webkit-scrollbar {
  display: none;
}

.input-text {
  width: 100%;
}

.first-row-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(3, var(--tile-size));
  gap: var(--gap);
}

.input-photo {
  grid-row: 1 / 4;
  grid-column: 1 / 2;
  height: 100%;
  width: calc(var(--tile-size) * 3 + var(--gap) * 2);
}

.name-input {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}

.tag-input {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}

.bithdate-input {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
}

.description-input {
  flex-shrink: 0;
}

.buttons-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: end;
  gap: var(--gap)
}
</style>
