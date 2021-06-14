import { useState } from 'react'
import { stopBubbling, getPercentagePosition } from './utils'
import { MouseTouchEvent, DragObject } from './types'

const useDrag = (currentPercentageValue: number): DragObject => {
  const [isMousePressed, setMousePressed] = useState<boolean>(false)
  const [percentagePosition, setPercentagePosition] = useState<number>(
    currentPercentageValue,
  )

  const dragStart = (event: MouseTouchEvent) => {
    /* @ToDo: prevent from firing event */
    /* if (event.button === 1 || event.button === 2) return */

    stopBubbling(event)
    setMousePressed(true)
    setPercentagePosition(getPercentagePosition(event))
  }

  const dragging = (event: MouseTouchEvent) => {
    stopBubbling(event)
    if (isMousePressed) {
      setPercentagePosition(getPercentagePosition(event))
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
    setPercentagePosition,
  }
}

export default useDrag
