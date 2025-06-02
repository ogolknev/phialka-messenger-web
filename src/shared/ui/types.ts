export const UIComponentColorList = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
  'neutral',
] as const
export type UIComponentColor = (typeof UIComponentColorList)[number]

export type UIButtonVariant = 'solid' | 'outline' | 'subtle' | 'soft'
export type UIInputVariant = 'outline' | 'subtle' | 'soft'

export type UIChildElementProps = {
  class?: string
  onClick?: (ev?: MouseEvent) => void
}
