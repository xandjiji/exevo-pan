import { MouseTouchEvent } from './types'

export const stopBubbling = (event: MouseTouchEvent): void => {
  event.stopPropagation()
}

const getNativeEvent = (event: MouseTouchEvent) =>
  event.nativeEvent instanceof MouseEvent
    ? event.nativeEvent
    : event.nativeEvent.changedTouches[0]

export const getPercentagePosition = (event: MouseTouchEvent): number => {
  const nativeEvent = getNativeEvent(event)

  const target = nativeEvent.target as HTMLDivElement

  const { left, width } = target.getBoundingClientRect()
  const newPositionX = nativeEvent.clientX - left

  /* @ToDo: better logic here */
  if (newPositionX < 0) return 0
  if (newPositionX > width) return 100
  return (newPositionX / width) * 100
}
