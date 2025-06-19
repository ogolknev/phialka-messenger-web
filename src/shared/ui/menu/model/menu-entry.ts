export interface MenuEntry {
  text: string
  value?: string | number
  icon?: string
  trailingIcon?: string
  callback?: () => void
}
