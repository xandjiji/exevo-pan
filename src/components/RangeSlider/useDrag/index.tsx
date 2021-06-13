import { useState } from 'react'
import { stopBubbling, getPositionX } from './utils'
import { MouseTouchEvent, DragObject } from './types'

const useDrag = (): DragObject => {
  const [isMousePressed, setMousePressed] = useState<boolean>(false)
  /* @ToDo: initial position */
  const [positionX, setPositionX] = useState<number>(0)

  const dragStart = (event: MouseTouchEvent) => {
    /* @ToDo: prevent from firing event */
    /* if (event.button === 1 || event.button === 2) return */

    stopBubbling(event)
    setMousePressed(true)
    setPositionX(getPositionX(event))
  }

  const dragging = (event: MouseTouchEvent) => {
    stopBubbling(event)
    if (isMousePressed) {
      setPositionX(getPositionX(event))
    }
  }

  const dragStop = (event: MouseTouchEvent) => {
    stopBubbling(event)
    setMousePressed(false)

    /* @ToDo: handleTrigger */
    /* handleTrigger() */
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
