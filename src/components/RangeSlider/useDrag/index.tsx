import { useState } from 'react'
import { stopBubbling, getPercentagePosition } from './utils'
import { MouseTouchEvent, DragObject } from './types'

const useDrag = (): DragObject => {
  const [isMousePressed, setMousePressed] = useState<boolean>(false)
  /* @ToDo: initial position */
  const [percentagePosition, setpercentagePosition] = useState<number>(0)

  const dragStart = (event: MouseTouchEvent) => {
    /* @ToDo: prevent from firing event */
    /* if (event.button === 1 || event.button === 2) return */

    stopBubbling(event)
    setMousePressed(true)
    setpercentagePosition(getPercentagePosition(event))
  }

  const dragging = (event: MouseTouchEvent) => {
    stopBubbling(event)
    if (isMousePressed) {
      setpercentagePosition(getPercentagePosition(event))
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
    percentagePosition,
  }
}

export default useDrag
