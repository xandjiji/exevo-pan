import { getPosition } from './utils'
import { UseDragState, Action } from './types'

const DragReducer = (state: UseDragState, action: Action): UseDragState => {
  switch (action.type) {
    case 'DRAG_START':
      return {
        ...state,
        isMousePressed: true,
        position: getPosition(action.event, action.clamped),
      }

    case 'DRAGGING':
      return {
        ...state,
        position: getPosition(action.event, action.clamped),
      }

    case 'DRAG_STOP':
      return {
        ...state,
        isMousePressed: false,
      }

    default:
      return { ...state }
  }
}

export default DragReducer
