import { MenuState, Action } from './reducer'
import { Item } from './types'

type UseKeyboardNavigationProps = {
  dispatch: React.Dispatch<Action>
  items: Item[]
} & MenuState

const getNextIndex = (
  currentIndex: number,
  increment: number,
  items: Item[],
): number => {
  const nextitem = items[currentIndex + increment]

  if (!nextitem) return currentIndex
  if (nextitem.disabled) {
    const nextIncrement = increment > 0 ? 1 : -1
    return getNextIndex(currentIndex, increment + nextIncrement, items)
  }
  return currentIndex + increment
}

const keySet = {
  increment: new Set(['ArrowDown', 'PageDown']),
  decrement: new Set(['ArrowUp', 'PageUp']),
  highlight: {
    first: new Set(['Home']),
    last: new Set(['End']),
  },
}

export const useKeyboardNavigation =
  ({ open, highlightedIndex, items, dispatch }: UseKeyboardNavigationProps) =>
  (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (keySet.increment.has(e.key) || keySet.decrement.has(e.key)) {
      dispatch({
        type: 'SET_HIGHLIGHTED_INDEX',
        index: getNextIndex(
          highlightedIndex,
          keySet.increment.has(e.key) ? 1 : -1,
          items,
        ),
      })
    }

    if (keySet.highlight.first.has(e.key) || keySet.highlight.last.has(e.key)) {
      const initialSearchedIndex = keySet.highlight.first.has(e.key)
        ? -1
        : items.length

      dispatch({
        type: 'SET_HIGHLIGHTED_INDEX',
        index: getNextIndex(
          initialSearchedIndex,
          initialSearchedIndex < 0 ? 1 : -1,
          items,
        ),
      })
    }
  }
