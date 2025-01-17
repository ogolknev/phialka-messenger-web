export function useValidation(value: string, options: {
  minLength?: {
    value: number,
    callback?: (() => void | unknown) | ((optionValue: number) => void | unknown)
  },
  maxLength?: {
    value: number,
    callback?: (() => void | unknown) | ((optionValue: number) => void | unknown)
  },
  regExp?: {
    value: RegExp,
    callback?: (() => void | unknown) | ((optionValue: RegExp) => void | unknown)
  }
}) {
  let minLength: boolean = true, maxLength: boolean = true, regExp: boolean = true
  if (options.minLength && value.length < options.minLength.value) {
    options.minLength.callback?.call(null, options.minLength.value)
    minLength = false
  }
  if (options.maxLength && value.length > options.maxLength.value) {
    options.maxLength.callback?.call(null, options.maxLength.value)
    maxLength = false
  }
  if (options.regExp && options.regExp.value.test(value)) {
    options.regExp.callback?.call(null, options.regExp.value)
    regExp = false
  }
  return minLength && maxLength && regExp
}
