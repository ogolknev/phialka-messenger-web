<script setup lang='ts'>
import TextInputElement from '@/elements/TextInputElement.vue';
import ButtonElement from '@/elements/ButtonElement.vue';
import { ref } from 'vue';
import { useValidation } from '@/composables/validation';
import { useAppStore } from '@/store/app';


const appStore = useAppStore()
const isLoginInputInvalid = ref(false)
const isPasswordInputInvalid = ref(false)

const model = defineModel<{
  username: string,
  password: string
}>({ required: true })
const emit = defineEmits(['sign-in'])

function loginValidate() {
  isLoginInputInvalid.value = !useValidation(model.value.username, {
    minLength: {
      value: 5,
      callback(minLength: number) {
        if (!isLoginInputInvalid.value) {
          appStore.toasts.push(`Minimum ${minLength} characters in login.`)
        }
      },
    },
    maxLength: {
      value: 20,
      callback(maxLength: number) {
        if (!isLoginInputInvalid.value) {
          appStore.toasts.push(`Maximum ${maxLength} characters in login.`)
        }
      },
    }
  })
}

function passwordValidate() {
  isPasswordInputInvalid.value = !useValidation(model.value.password, {
    minLength: {
      value: 8,
      callback(minLength: number) {
        if (!isPasswordInputInvalid.value) {
          appStore.toasts.push(`Minimum ${minLength} characters in password.`)
        }
      }
    },
    maxLength: {
      value: 32,
      callback(maxLength: number) {
        if (!isPasswordInputInvalid.value) {
          appStore.toasts.push(`Maximum ${maxLength} characters in password.`)
        }
      }
    }
  })
}

function onSubmit() {
  loginValidate()
  passwordValidate()
  if (isLoginInputInvalid.value || isPasswordInputInvalid.value) {
    return
  }
  emit('sign-in')
}
</script>

<template>
  <div class="sign-in-form form" @keydown.enter="onSubmit">
    <text-input-element class="login-input" :class="{ invalid: isLoginInputInvalid }" v-model="model.username"
      placeholder="Login..." maxlength="47" @input="loginValidate"></text-input-element>
    <text-input-element class="password-input" :class="{ invalid: isPasswordInputInvalid }" v-model="model.password"
      placeholder="Password..." maxlength="47" @input="passwordValidate" password></text-input-element>
    <div class="button-container">
      <button-element tabindex="0" @click="onSubmit">Sign In</button-element>
    </div>
  </div>
</template>

<style scoped>
.text-input-element {
  width: 100%;
}

.button-container {
  margin-left: auto;
}
</style>
