export type MouseTouchEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>

type MouseOrTouchHandler = (event: MouseTouchEvent) => void

export interface positionObject {
  x: number
  y: number
}

export interface DragObject {
  binders: {
    onMouseDown: MouseOrTouchHandler
    onTouchStart: MouseOrTouchHandler
    onMouseMove: MouseOrTouchHandler
    onTouchMove: MouseOrTouchHandler
    onMouseUp: MouseOrTouchHandler
    onTouchEnd: MouseOrTouchHandler
  }
  isMousePressed: boolean
  position: positionObject
  setPosition: React.Dispatch<React.SetStateAction<positionObject>>
}
