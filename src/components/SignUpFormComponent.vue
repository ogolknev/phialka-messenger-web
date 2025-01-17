<script setup lang='ts'>
import { useValidation } from '@/composables/validation';
import TextInputElement from '@/elements/TextInputElement.vue';
import ButtonElement from '@/elements/ButtonElement.vue';
import { ref } from 'vue';

const isNameInputInvalid = ref(false)
const isLoginInputInvalid = ref(false)
const isPasswordInputInvalid = ref(false)

const model = defineModel<{
  name: string,
  username: string,
  password: string
}>({ required: true })
const emit = defineEmits(['sign-up'])

function nameValidate() {
  isNameInputInvalid.value = !useValidation(model.value.name, {
    minLength: {
      value: 3
    },
    maxLength: {
      value: 20
    }
  })
}

function loginValidate() {
  isLoginInputInvalid.value = !useValidation(model.value.username, {
    minLength: {
      value: 5
    },
    maxLength: {
      value: 20
    }
  })
}

function passwordValidate() {
  isPasswordInputInvalid.value = !useValidation(model.value.password, {
    minLength: {
      value: 8
    },
    maxLength: {
      value: 32
    }
  })
}

function onSubmit() {
  nameValidate()
  loginValidate()
  passwordValidate()
  if (isNameInputInvalid.value || isLoginInputInvalid.value || isPasswordInputInvalid.value) {
    return
  }
  emit('sign-up')
}

</script>

<template>
  <div class="sign-up-form form" @keydown.enter="onSubmit">
    <text-input-element class="name-input success" :class="{ invalid: isNameInputInvalid }" v-model="model.name"
      placeholder="Name..." autocomplete="name" maxlength="47" @input="nameValidate"></text-input-element>
    <text-input-element class="login-input success" :class="{ invalid: isLoginInputInvalid }" v-model="model.username"
      placeholder="Login..." autocomplete="login username" maxlength="47" @input="loginValidate"></text-input-element>
    <text-input-element class="password-input success" :class="{ invalid: isPasswordInputInvalid }"
      v-model="model.password" placeholder="Password..." autocomplete="new-password password" maxlength="47"
      @input="passwordValidate" password></text-input-element>
    <div class="button-container">
      <button-element class="success" @click="onSubmit">Sign Up</button-element>
    </div>
  </div>
</template>

<style scoped>
.text-input-element {
  position: relative;
  width: 100%;
}

.button-container {
  margin-left: auto;
}
</style>
