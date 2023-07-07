interface Tooltip {
  visible: boolean
  timeoutId: NodeJS.Timeout | null
}

export const showTooltip = (tooltip: Tooltip) => {
  if (tooltip.timeoutId !== null) {
    clearTimeout(tooltip.timeoutId)
    tooltip.timeoutId = null
  }

  tooltip.visible = false

  tooltip.timeoutId = setTimeout(() => {
    tooltip.visible = true
  }, 600)
}

export const cancelTooltip = (tooltip: Tooltip) => {
  if (tooltip.timeoutId !== null) {
    clearTimeout(tooltip.timeoutId)
    tooltip.timeoutId = null
  }

  tooltip.visible = false
}
