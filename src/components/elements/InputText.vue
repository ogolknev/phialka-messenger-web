<script setup lang="ts">
import { ref } from 'vue';


const model = defineModel({ type: String, required: true })
const {
  placeholder,
  maxlength = 20,
  type = 'text',
  spellcheck = false,
  invalid = false,
  color
} = defineProps<{
  placeholder?: string,
  maxlength?: number | string,
  type?: 'password' | 'text' | 'email' | 'tel',
  autocomplete?: string,
  spellcheck?: boolean | 'true' | 'false',
  invalid?: boolean,
  color?: 'success' | 'warning' | 'danger'
}>()

const showPassword = ref(false)

</script>

<template>
  <div class="tile input-text-container" :class="[{ invalid }, color]">
    <input v-model="model" class="input input-text" :type="showPassword ? '' : type" :autocomplete="autocomplete" :maxlength="maxlength"
      :placeholder="placeholder" :spellcheck="spellcheck">
    <button v-if="type === 'password'" class="toogle-password-btn" @click.prevent="showPassword = !showPassword">
      <svg v-if="!showPassword" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M6.9366 17.3511C8.24018 13.8749 12.0037 12 16.0003 12C19.9969 12 23.7604 13.8749 25.0639 17.3511C25.2579 17.8682 25.8343 18.1302 26.3514 17.9363C26.8685 17.7424 27.1305 17.166 26.9366 16.6489C25.2402 12.1251 20.5037 10 16.0003 10C11.4969 9.99999 6.76037 12.1251 5.06394 16.6488C4.87002 17.1659 5.13203 17.7424 5.64915 17.9363C6.16627 18.1302 6.74268 17.8682 6.9366 17.3511ZM18.0003 17C18.0003 18.1046 17.1048 19 16.0003 19C14.8957 19 14.0003 18.1046 14.0003 17C14.0003 15.8954 14.8957 15 16.0003 15C17.1048 15 18.0003 15.8954 18.0003 17ZM20.0003 17C20.0003 19.2091 18.2094 21 16.0003 21C13.7911 21 12.0003 19.2091 12.0003 17C12.0003 14.7909 13.7911 13 16.0003 13C18.2094 13 20.0003 14.7909 20.0003 17Z"
          fill="inherit" />
      </svg>
      <svg v-else width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M18.8794 10.2923C17.93 10.0965 16.9596 10 15.9998 10C11.4964 9.99999 6.75988 12.1251 5.06345 16.6488C4.86953 17.1659 5.13154 17.7424 5.64866 17.9363C6.16578 18.1302 6.74219 17.8682 6.93611 17.3511C8.23969 13.8749 12.0032 12 15.9998 12C16.3765 12 16.7512 12.0167 17.1219 12.0497L18.8794 10.2923ZM16.1681 13.0035C16.1123 13.0012 16.0562 13 15.9998 13C13.7906 13 11.9998 14.7909 11.9998 17C11.9998 17.0564 12.0009 17.1125 12.0033 17.1684L16.1681 13.0035ZM14.2369 20.5916C14.7687 20.8531 15.3671 21 15.9998 21C18.2089 21 19.9998 19.2091 19.9998 17C19.9998 16.3673 19.8529 15.769 19.5914 15.2371L17.9931 16.8354C17.9975 16.8897 17.9998 16.9446 17.9998 17C17.9998 18.1046 17.1044 19 15.9998 19C15.9444 19 15.8894 18.9978 15.8352 18.9933L14.2369 20.5916ZM21.487 13.3415L22.9484 11.8801C24.7129 12.9734 26.1505 14.5539 26.9361 16.6489C27.13 17.166 26.868 17.7424 26.3509 17.9363C25.8338 18.1302 25.2574 17.8682 25.0635 17.3511C24.4043 15.5934 23.1162 14.245 21.487 13.3415Z"
          fill="inherit" />
        <rect x="23.7783" y="6.80762" width="2" height="24" rx="1" transform="rotate(45 23.7783 6.80762)"
          fill="inherit" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.input-text-container {
  --accent-input: var(--accent-0)
}

.input-text-container.success {
  --accent-input: var(--success-0)
}

.input-text-container.warning {
  --accent-input: var(--warning-0)
}

.input-text-container.danger {
  --accent-input: var(--danger-0)
}

.input-text-container {
  display: block;
  position: relative;
  padding: 0;
}

.input-text-container:has(.input-text:focus) {
  border-color: var(--accent-input);
  caret-color: var(--accent-input);
}

.input-text {
  width: 100%;
  height: 100%;
}

.toogle-password-btn {
  position: absolute;
  right: var(--gap);
  top: 50%;
  width: calc(var(--tile-size) * 0.4);
  height: calc(var(--tile-size) * 0.4);
  padding: 0;
  transform: translateY(-50%);
  background-color: transparent;
  fill: var(--icon-clr);
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
}

.toogle-password-btn:hover {
  fill: var(--accent-0)
}
</style>
