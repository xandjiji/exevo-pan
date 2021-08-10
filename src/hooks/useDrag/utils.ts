import { MouseTouchEvent, positionObject } from './types'

export const stopBubbling = (event: MouseTouchEvent): void => {
  event.stopPropagation()
}

const getNativeEvent = (event: MouseTouchEvent) =>
  event.nativeEvent instanceof MouseEvent
    ? event.nativeEvent
    : event.nativeEvent.changedTouches[0]

export const getPosition = (event: MouseTouchEvent): positionObject => {
  const nativeEvent = getNativeEvent(event)

  const target = nativeEvent.target as HTMLDivElement
  const parentNode = target.parentNode as HTMLDivElement

  const { left, top } = parentNode.getBoundingClientRect()
  const { clientX, clientY } = nativeEvent
  return {
    x: clientX - left,
    y: clientY - top,
  }
}
