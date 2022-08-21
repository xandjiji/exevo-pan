import { renderHook } from '@testing-library/react-hooks'
import useTracking from '..'

describe('useTracking()', () => {
  test('`add` should append new data to the end of the list', () => {
    const { result } = renderHook(() => useTracking())
  })

  test.todo('`update` should update data for a specific `key`')

  test.todo('`remove` should remove data for a specific `key`')
})
