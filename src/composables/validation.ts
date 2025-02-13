import { reactive, ref, watch, type Ref } from "vue"

export function useValidation(target: Ref<string>, rules: {
  minLength?: {
    value: number,
    callback?: (value: number) => void
  },
  maxLength?: {
    value: number,
    callback?: (value: number) => void
  },
  hasCapital?: {
    callback?: () => void
  },
  hasLowercase?: {
    callback?: () => void
  },
  hasSpecial?: {
    callback?: () => void
  },
  alphaNumeric?: {
    callback?: () => void
  },
  validDate?: {
    callback?: () => void
  }
}) {
  const touch = ref(false)
  const silenseIsValid = ref(false)
  const isValid = ref(true)
  const rulesValidationInitial = {
    minLength: true,
    maxLength: true,
    hasCapital: true,
    hasLowercase: true,
    hasSpecial: true,
    alphaNumeric: true,
    validDate: true,
  }
  const rulesValidation = reactive<{
    minLength?: boolean,
    maxLength?: boolean,
    hasCapital?: boolean,
    hasLowercase?: boolean,
    hasSpecial?: boolean,
    alphaNumeric?: boolean,
    validDate?: boolean,
  }>({...rulesValidationInitial})
  function validateRule(
    rule: keyof typeof rulesValidation,
    validattionFunction: (target: string, value?: any) => boolean,
    repeatCallback = false
  ) {
    if (rules[rule]) {
      const previous = rulesValidation[rule]
      rulesValidation[rule] = validattionFunction(target.value, 'value' in rules[rule] ? rules[rule].value : undefined)
      if (!rulesValidation[rule] && (previous !== rulesValidation[rule] || repeatCallback)) {
        if ('value' in rules[rule]) rules[rule].callback?.(rules[rule].value as number)
        else rules[rule].callback?.()
      } else if (rulesValidation[rule] && previous !== rulesValidation[rule]) {
        Object.assign(rulesValidation, rulesValidationInitial)
      }
      return rulesValidation[rule]
    }
    return true
  }
  function validate(repeatCallback = true) {
    touch.value = true;

    console.log('validate');

    (() => {
      if (!validateRule('minLength', minLength, repeatCallback)) return
      if (!validateRule('maxLength', maxLength, repeatCallback)) return
      if (!validateRule('hasCapital', hasCapital, repeatCallback)) return
      if (!validateRule('hasLowercase', hasLowercase, repeatCallback)) return
      if (!validateRule('hasSpecial', hasSpecial, repeatCallback)) return
      if (!validateRule('alphaNumeric', alphaNumeric, repeatCallback)) return
      if (!validateRule('validDate', validDate, repeatCallback)) return
    })()

    silenseIsValid.value = Object.values(rulesValidation).every(value => value === true) && Object.keys(rulesValidation).length !== 0
    isValid.value = silenseIsValid.value || !touch.value
  }
  watch(target, () => {
    validate(false)
  })

  return {
    touch,
    validate,
    isValid,
    silenseIsValid
  }
}

function minLength(target: string, value: number) {
  return target.length >= value
}

function maxLength(target: string, value: number) {
  return target.length <= value
}

function hasCapital(target: string) {
  return /[A-Z]/.test(target) || target.length === 0
}

function hasLowercase(target: string) {
  return /[a-z]/.test(target) || target.length === 0
}

function hasSpecial(target: string) {
  return /[!@#$%^&*(),.?":{}|<>]/.test(target) || target.length === 0
}

function alphaNumeric(target: string) {
  return /^[a-zA-Z0-9]*$/.test(target) || target.length === 0
}

function validDate(target: string) {
  if (!/^\d{2}.\d{2}.\d{4}$/.test(target)) return false
  const [d, m, y] = target.split('.').map(Number)
  const date = new Date(y, m - 1, d)
  return (
    date.getFullYear() === y &&
    date.getMonth() + 1 === m &&
    date.getDate() === d
  )
}


