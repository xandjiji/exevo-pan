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

const getBoundaryIndex = (order: 'first' | 'last', items: Item[]): number => {
  const initialSearchedIndex = order === 'first' ? -1 : items.length

  return getNextIndex(
    initialSearchedIndex,
    initialSearchedIndex < 0 ? 1 : -1,
    items,
  )
}

const keySet = {
  increment: new Set(['ArrowDown', 'PageDown']),
  decrement: new Set(['ArrowUp', 'PageUp']),
  highlight: {
    first: new Set(['Home']),
    last: new Set(['End']),
  },
  select: new Set(['Enter', ' ']),
  close: new Set(['Esc', 'Tab']),
}

export const useKeyboardNavigation: KeyboardHandler =
  ({ open, highlightedIndex, items, dispatch }) =>
  (e) => {
    if (keySet.increment.has(e.key) || keySet.decrement.has(e.key)) {
      const noHighlightedIndex = highlightedIndex === -1
      const isIncrement = keySet.increment.has(e.key)

      dispatch({
        type: 'SET_HIGHLIGHTED_INDEX',
        index: noHighlightedIndex
          ? getBoundaryIndex(isIncrement ? 'first' : 'last', items)
          : getNextIndex(highlightedIndex, isIncrement ? 1 : -1, items),
      })
      return e.preventDefault()
    }

    if (keySet.highlight.first.has(e.key) || keySet.highlight.last.has(e.key)) {
      dispatch({
        type: 'SET_HIGHLIGHTED_INDEX',
        index: getBoundaryIndex(
          keySet.highlight.first.has(e.key) ? 'first' : 'last',
          items,
        ),
      })
      return e.preventDefault()
    }

    if (keySet.select.has(e.key)) {
      if (open) {
        items[highlightedIndex].onSelect?.()
        dispatch({ type: 'SET_OPEN', open: false })
      } else {
        dispatch({
          type: 'SET_OPEN',
          open: true,
          highlightedIndex: getBoundaryIndex('first', items),
        })
      }
      return e.preventDefault()
    }

    if (keySet.close.has(e.key)) {
      dispatch({ type: 'SET_OPEN', open: false })
      return e.preventDefault()
    }
  }

const DELAY = 1000
const RESET_VALUE = ''
const ignoredKeys = new Set(['Enter'])

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

  return useCallback(({ key }) => {
    if (!ignoredKeys.has(key)) {
      setTerm((prev) => (prev + key).toLowerCase())
    }
  }, [])
}
