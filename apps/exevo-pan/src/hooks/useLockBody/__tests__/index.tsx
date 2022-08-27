import { renderHook } from '@testing-library/react-hooks'
import useLockBody, { LockBodyProvider } from '../index'

const assertLocked = (state = true) => {
  expect(document.body).toHaveStyle({ overflow: state ? 'hidden' : 'unset' })
}

describe('useLockBody', () => {
  it('should add overflow style to body element', () => {
    let state = false
    const { rerender } = renderHook(() => useLockBody(state), {
      wrapper: LockBodyProvider,
    })

    assertLocked(false)
    state = true
    rerender()
    assertLocked(true)
  })
})
