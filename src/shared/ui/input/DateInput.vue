<script setup lang='ts'>
import { dateToString } from '@/shared/utils';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import Inputmask from 'inputmask';

const model = defineModel<Date | null>({ required: true })
const { placeholder } = defineProps<{ placeholder?: string }>()
const value = ref('')
const input = useTemplateRef('input')

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  value.value = target.value
  model.value = parseDate(value.value)
}

function parseDate(dateString: string): Date | null {
  const [day, month, year] = dateString.split('.').map(Number)
  if (!isValidDate(day, month, year)) return null

  const date = new Date(year, month - 1, day)
  if (date.getDate() !== day || date.getMonth() !== month - 1) {
    return null
  }

  return date
}

function isValidDate(day: number, month: number, year: number) {
  return (
    day >= 1 && day <= 31 &&
    month >= 1 && month <= 12 &&
    year >= 1000 && year <= 9999
  )
}

watch(model, () => {
  if (model.value) value.value = dateToString(model.value, 'dd.MM.yyyy')
}, { immediate: true })

onMounted(() => {
  if (input.value) new Inputmask('99.99.9999').mask(input.value)
})

</script>

<template>
  <div class="date-input input tile">
    <input ref="input" :value="value" @input="onInput" type="text" inputmode="numeric" :placeholder="placeholder">
  </div>
</template>

<style scoped>
@import './style/main.css';
</style>
