<script setup lang='ts'>
import PhotoInputElement from '@/elements/PhotoInputElement.vue';
import TextInputElement from '@/elements/TextInputElement.vue';
import ButtonElement from '@/elements/ButtonElement.vue';
import { useValidation } from '@/composables/validation';
import { useAppStore } from '@/store/app';

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

const appStore = useAppStore()

console.log(name.value)

const validation = {
  name: useValidation(name, {
    maxLength: {
      value: 30,
      callback(value) {
        appStore.toasts.push(`Maximum ${value} chars in name`)
      }
    }
  }),
  tag: useValidation(tag, {
    minLength: {
      value: 3,
      callback(value) {
        appStore.toasts.push(`Minimum ${value} chars in tag`)
      }
    },
    maxLength: {
      value: 12,
      callback(value) {
        appStore.toasts.push(`Maximum ${value} chars in tag`)
      }
    }
  }),
  birthdate: useValidation(birthdate, {
    validDate: {
      callback() {
        appStore.toasts.push(`Birthdate must be a valid date`)
      }
    }
  }),
  description: useValidation(description, {
    maxLength: {
      value: 200,
      callback(value) {
        appStore.toasts.push(`Maximum ${value} chars in description`)
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
  <div class="profile-edit-form-component">
    <div class="first-row-container">
      <photo-input-element
        :src="imageUrl"
        @change="onChange"
      ></photo-input-element>
      <text-input-element
        v-model="name"
        class="name-input"
        :invalid="!validation.name.isValid.value"
        placeholder="Name..."
        color='warning'
      ></text-input-element>
      <text-input-element
        v-model="tag"
        class="tag-input"
        :invalid="!validation.tag.isValid.value"
        placeholder="Tag..."
        color='warning'
      ></text-input-element>
      <text-input-element
        v-model="birthdate"
        class="bithdate-input"
        :invalid="!validation.birthdate.isValid.value"
        placeholder="Birthdate..."
        color='warning'
        date
      ></text-input-element>
    </div>
    <text-input-element
      v-model="description"
      class="description-input"
      :invalid="!validation.description.isValid.value"
      placeholder="Description..."
      color='warning'
      :maxrows="4"
      :maxlength="200"
    ></text-input-element>
    <div class="buttons-container">
      <button-element
        color='danger'
        @click="onRemove"
      >Remove</button-element>
      <button-element
        color='warning'
        @click="onSubmit"
      >Edit</button-element>
    </div>
  </div>
</template>

<style scoped>
.profile-edit-form-component {
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap);
  scrollbar-width: none;
}

.profile-edit-form-component::-webkit-scrollbar {
  display: none;
}

.text-input-element {
  width: 100%;
}

.first-row-container {
  display: grid;
  grid-template-columns: calc(var(--tile-size) * 3 + var(--gap) * 2) 1fr;
  grid-template-rows: repeat(3, var(--tile-size));
  gap: var(--gap);
}

.photo-input-element {
  grid-row: 1 / 4;
  grid-column: 1 / 2;
  height: 100%;
  width: 100%;
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
