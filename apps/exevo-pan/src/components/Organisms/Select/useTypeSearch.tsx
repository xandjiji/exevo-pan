/* eslint-disable consistent-return */
import { useState, useCallback, useEffect } from 'react'
import { Action } from './types'

const DELAY = 1000
const RESET_VALUE = ''

const useTypeSearch = (dispatch: React.Dispatch<Action>, options: Option[]) => {
  const [term, setTerm] = useState(RESET_VALUE)

  const handleSearch: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    ({ key }) => setTerm((prev) => prev + key),
    [],
  )

  useEffect(() => {
    if (term === RESET_VALUE) return

    dispatch({ type: 'USER_TYPING', term, options })

    const handler = setTimeout(() => setTerm(RESET_VALUE), DELAY)
    return () => clearTimeout(handler)
  }, [term, options])

  return handleSearch
}

export default useTypeSearch
