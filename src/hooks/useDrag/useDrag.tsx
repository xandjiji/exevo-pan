import { useState } from 'react'
import { stopBubbling, getPosition } from './utils'
import { MouseTouchEvent, positionObject, DragObject } from './types'

const useDrag = (): DragObject => {
  const [isMousePressed, setMousePressed] = useState<boolean>(false)
  const [position, setPosition] = useState<positionObject>({
    x: 0,
    y: 0,
  } as positionObject)

  const dragStart = (event: MouseTouchEvent) => {
    /* @ToDo: prevent from firing event */
    /* if (event.button === 1 || event.button === 2) return */

    stopBubbling(event)
    setMousePressed(true)
    setPosition(getPosition(event))
  }

  const dragging = (event: MouseTouchEvent) => {
    stopBubbling(event)
    if (isMousePressed) {
      setPosition(getPosition(event))
    }
  }

  const dragStop = (event: MouseTouchEvent) => {
    stopBubbling(event)
    setMousePressed(false)
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
    position,
    setPosition,
  }
}

export default useDrag
