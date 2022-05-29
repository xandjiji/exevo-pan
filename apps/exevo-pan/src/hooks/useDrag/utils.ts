import { MouseTouchEvent, PositionObject } from './types'

export const stopBubbling = (event: MouseTouchEvent): void => {
  event.stopPropagation()
  /* persisting the event is necessary to be compatible with React 16 or less */
  event.persist()
}

const getNativeEvent = (event: MouseTouchEvent) =>
  event.nativeEvent instanceof MouseEvent
    ? event.nativeEvent
    : event.nativeEvent.changedTouches[0]

const clampValue = (value: number, range: [number, number]): number => {
  const [min, max] = range

  if (value < min) return min
  if (value > max) return max
  return value
}

export const getPosition = (
  event: MouseTouchEvent,
  clamped = true,
): PositionObject => {
  const nativeEvent = getNativeEvent(event)

  const target = nativeEvent.target as HTMLDivElement
  const parentNode = target.parentNode as HTMLDivElement

  const { left, top, width, height } = parentNode.getBoundingClientRect()
  const { clientX, clientY } = nativeEvent

  const relativeX = clientX - left
  const relativeY = clientY - top

  if (clamped) {
    return {
      x: clampValue(relativeX, [0, width]),
      y: clampValue(relativeY, [0, height]),
      percentageX: clampValue(relativeX / width, [0, 1]),
      percentageY: clampValue(relativeY / height, [0, 1]),
    }
  }
  return {
    x: relativeX,
    y: relativeY,
    percentageX: relativeX / width,
    percentageY: relativeY / height,
  }
}
