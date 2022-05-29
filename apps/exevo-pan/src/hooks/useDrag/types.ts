export type MouseTouchEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>

type MouseOrTouchHandler = (event: MouseTouchEvent) => void

export interface PositionObject {
  x: number
  y: number
  percentageX: number
  percentageY: number
}

export interface UseDragProps {
  clamped?: boolean
}

export interface UseDragState {
  isMousePressed: boolean
  position: PositionObject
}

export type Action =
  | {
      type: 'DRAG_START'
      event: MouseTouchEvent
      clamped: boolean
    }
  | {
      type: 'DRAGGING'
      event: MouseTouchEvent
      clamped: boolean
    }
  | {
      type: 'DRAG_STOP'
      event: MouseTouchEvent
    }

export interface DragObject extends UseDragState {
  binders: {
    onMouseDown: MouseOrTouchHandler
    onTouchStart: MouseOrTouchHandler
    onMouseMove: MouseOrTouchHandler
    onTouchMove: MouseOrTouchHandler
    onMouseUp: MouseOrTouchHandler
    onTouchEnd: MouseOrTouchHandler
  }
}
