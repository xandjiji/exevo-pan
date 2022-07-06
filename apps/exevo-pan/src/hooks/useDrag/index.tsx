import { useReducer, useCallback } from 'react'
import DragReducer from './reducer'
import { stopBubbling } from './utils'
import { UseDragProps, MouseTouchEvent, DragObject } from './types'

const useDrag = (
  { clamped = false }: UseDragProps = { clamped: false },
): DragObject => {
  const [{ isMousePressed, position }, dispatch] = useReducer(DragReducer, {
    isMousePressed: false,
    position: { x: 0, y: 0, percentageX: 0, percentageY: 0 },
  })

  const dragStart = useCallback(
    (event: MouseTouchEvent) => {
      stopBubbling(event)
      dispatch({ type: 'DRAG_START', event, clamped })
    },
    [dispatch, clamped],
  )

  const dragging = useCallback(
    (event: MouseTouchEvent) => {
      if (isMousePressed) {
        stopBubbling(event)
        dispatch({ type: 'DRAGGING', event, clamped })
      }
    },
    [dispatch, isMousePressed, clamped],
  )

  const dragStop = useCallback(
    (event: MouseTouchEvent) => {
      stopBubbling(event)
      dispatch({ type: 'DRAG_STOP', event })
    },
    [dispatch],
  )

  return {
    isMousePressed,
    position,
    binders: {
      onMouseDown: dragStart,
      onTouchStart: dragStart,
      onMouseMove: dragging,
      onTouchMove: dragging,
      onMouseUp: dragStop,
      onTouchEnd: dragStop,
    },
  }
}

export default useDrag
