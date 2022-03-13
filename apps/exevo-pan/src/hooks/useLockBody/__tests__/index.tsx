import { renderHook } from '@testing-library/react-hooks'
import useLockBody from '../index'

describe('useLockBody', () => {
  it('should add overflow style to body element', () => {
    const { rerender } = renderHook((locked = true) =>
      useLockBody(locked as boolean),
    )

    expect(document.body).toHaveStyle({ overflow: 'hidden' })

    rerender(false)

    expect(document.body).toHaveStyle({ overflow: 'unset' })
  })
})
