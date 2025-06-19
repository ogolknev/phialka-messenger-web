export function getPopoverPosition(
  triggerEl: HTMLElement,
  popoverEl: HTMLElement,
  options: GetPopoverPosition = {},
) {
  const MARGIN = 5

  const triggerRect = triggerEl.getBoundingClientRect()
  const popoverRect = popoverEl.getBoundingClientRect()

  let { content } = options
  if (!content) content = { align: "center", side: "bottom" }
  if (!content.align) content.align = "center"
  if (!content.side) content.side = "bottom"

  let popoverX: number = 0
  let popoverY: number = 0

  if (content.side === "top") {
    popoverY = triggerRect.top - popoverRect.height - MARGIN
  } else if (content.side === "bottom") {
    popoverY = triggerRect.bottom + MARGIN
  } else if (content.side === "left") {
    popoverX = triggerRect.left - popoverRect.width - MARGIN
  } else {
    popoverX = triggerRect.right + MARGIN
  }

  if (["top", "bottom"].includes(content.side)) {
    if (content.align === "start") {
      popoverX = triggerRect.x
    } else if (content.align === "center") {
      popoverX = triggerRect.x + triggerRect.width / 2 - popoverRect.width / 2
    } else {
      popoverX = triggerRect.x - popoverRect.width + triggerRect.width
    }
  } else {
    if (content.align === "start") {
      popoverY = triggerRect.y
    } else if (content.align === "center") {
      popoverY = triggerRect.y + triggerRect.height / 2 - popoverRect.height / 2
    } else {
      popoverY = triggerRect.y - popoverRect.height + triggerRect.height
    }
  }

  if (popoverX < MARGIN) {
    popoverX = MARGIN
  }
  if (popoverY < MARGIN) {
    popoverY = MARGIN
  }
  if (popoverX + popoverRect.width > window.innerWidth - MARGIN) {
    popoverX = window.innerWidth - popoverRect.width - MARGIN
  }
  if (popoverY + popoverRect.height > window.innerHeight - MARGIN) {
    popoverY = window.innerHeight - popoverRect.height - MARGIN
  }

  return {
    left: popoverX,
    top: popoverY,
  }
}

export interface GetPopoverPosition {
  content?: {
    align?: PopoverAlign
    side?: PopoverSide
  }
}

export type PopoverAlign = "start" | "center" | "end"
export type PopoverSide = "top" | "bottom" | "left" | "right"
