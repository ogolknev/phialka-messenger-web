<script setup lang='ts'>
import { dateToString } from '@/shared/utils';
import { computed } from 'vue';

const model = defineModel<Date | null>({ required: true })
const value = computed({
  get() {
    return model.value ? dateToString(model.value, 'dd.MM.yyyy') : ''
  },
  set(newValue) {
    const date = parseDate(newValue)
    if (date) model.value = date
  }
})

function parseDate(value: string): Date | null {
  const [day, month, year] = value.split('.').map(Number)
  if (
    day < 1 || day > 31 ||
    month < 1 || month > 12 ||
    year < 1000 || year > 9999
  ) return null

  const date = new Date(year, month - 1, day)
  if (date.getDate() !== day || date.getMonth() !== month - 1) {
    return null
  }

  return date
}

</script>

<template>
  <div class="date-input">
    <input v-model="value" type="text" pattern="\d{2}\.\d{2}\.\d{4}" inputmode="numeric">
  </div>
</template>
