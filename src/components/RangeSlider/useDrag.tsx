import { useState } from 'react'

/* @ToDo: add this to global hook folder */

/* @ToDo: add this to utils */
const stopBubbling = (event: MouseOrTouchEvent): void => {
  event.stopPropagation()
}

/* @ToDo: add this to utils */
const getNativeEvent = (event: MouseOrTouchEvent) =>
  event.nativeEvent instanceof MouseEvent
    ? event.nativeEvent
    : event.nativeEvent.changedTouches[0]

const getPositionX = (event: MouseOrTouchEvent): number => {
  const nativeEvent = getNativeEvent(event)

  const target = nativeEvent.target as HTMLDivElement

  const { left, width } = target.getBoundingClientRect()
  const newPositionX = nativeEvent.clientX - left

  /* @ToDo: better logic here */
  if (newPositionX < 0) return 0
  if (newPositionX > width) return width
  return newPositionX
}

type MouseOrTouchEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>

type MouseOrTouchHandler = (event: MouseOrTouchEvent) => void

interface DragObject {
  binders: {
    onMouseDown: MouseOrTouchHandler
    onTouchStart: MouseOrTouchHandler
    onMouseMove: MouseOrTouchHandler
    onTouchMove: MouseOrTouchHandler
    onMouseUp: MouseOrTouchHandler
    onTouchEnd: MouseOrTouchHandler
  }
  isMousePressed: boolean
  positionX: number
}

const useDrag = (): DragObject => {
  const [isMousePressed, setMousePressed] = useState<boolean>(false)
  const [positionX, setPositionX] = useState<number>(0)

  const dragStart = (event: MouseOrTouchEvent) => {
    /* @ToDo: prevent from firing event */
    /* if (event.button === 1 || event.button === 2) return */

    stopBubbling(event)
    setMousePressed(true)
    setPositionX(getPositionX(event))
  }

  const dragging = (event: MouseOrTouchEvent) => {
    stopBubbling(event)
    if (isMousePressed) {
      setPositionX(getPositionX(event))
    }
  }

  const dragStop = (event: MouseOrTouchEvent) => {
    stopBubbling(event)
    setMousePressed(false)

    /* @ToDo: handleTrigger */
    /* handleTrigger() */
    /* setObjectPosition({
      initialX: 0,
      positionX: 0,
      currentX: 0,
    }) */
  }

  return {
    binders: {
      onMouseDown: dragStart,
      onTouchStart: dragStart,
      onMouseMove: dragging,
      onTouchMove: dragging,
      onMouseUp: dragStop,
      onTouchEnd: dragStop,
    },
    isMousePressed,
    positionX,
  }
}

export default useDrag
