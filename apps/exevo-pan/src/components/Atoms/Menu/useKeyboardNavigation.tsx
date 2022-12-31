/* eslint-disable consistent-return */
import { useState, useCallback, useEffect } from 'react'
import { MenuState, Action } from './reducer'
import { Item } from './types'

type UseKeyboardNavigationProps = {
  dispatch: React.Dispatch<Action>
  items: Item[]
} & MenuState

type KeyboardHandler = (
  args: UseKeyboardNavigationProps,
) => (e: React.KeyboardEvent<HTMLDivElement>) => void

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
  select: new Set(['Enter', 'Space']),
  close: new Set(['Esc', 'Tab']),
}

export const useKeyboardNavigation: KeyboardHandler =
  ({ highlightedIndex, items, dispatch }) =>
  (e) => {
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

    if (keySet.select.has(e.key)) {
      items[highlightedIndex].onSelect?.()
      dispatch({ type: 'SET_OPEN', open: false })
    }

    if (keySet.close.has(e.key)) {
      e.preventDefault()
      dispatch({ type: 'SET_OPEN', open: false })
    }
  }

const DELAY = 1000
const RESET_VALUE = ''

export const useKeyboardSearch: KeyboardHandler = ({ items, dispatch }) => {
  const [term, setTerm] = useState(RESET_VALUE)

  useEffect(() => {
    if (term === RESET_VALUE) return

    dispatch({
      type: 'SET_HIGHLIGHTED_INDEX',
      index: items.findIndex(
        ({ label, 'aria-label': ariaLabel }) =>
          (ariaLabel ?? label).slice(0, term.length).toLowerCase() === term,
      ),
    })

    const handler = setTimeout(() => setTerm(RESET_VALUE), DELAY)
    return () => clearTimeout(handler)
  }, [term, items])

  return useCallback(
    ({ key }) => setTerm((prev) => (prev + key).toLowerCase()),
    [],
  )
}
