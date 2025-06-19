export const UIComponentColorList = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral",
] as const
export type UIComponentColor = (typeof UIComponentColorList)[number]
