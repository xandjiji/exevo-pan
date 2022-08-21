import { renderHook } from '@testing-library/react-hooks'
import { setup } from 'utils/test'
import useTracking from '..'

setup.getFromLocalStorage()

describe('useTracking()', () => {
  test('`add` should append new data to the end of the list', () => {
    const { result } = renderHook(() => useTracking())

    expect(result.current.list).toEqual([])

    const firstAddition = {
      currentStamina: {
        seconds: 1,
        time: '10:20',
      },
      targetStamina: {
        seconds: 239,
        time: '23:19',
      },
    }
    result.current.action.add(firstAddition)
    const [addedItem] = result.current.list

    expect(addedItem.targetStamina).toEqual(firstAddition.targetStamina)
    expect(addedItem.currentStamina).toEqual(firstAddition.currentStamina)

    const secondAddition = {
      currentStamina: {
        seconds: 29,
        time: '12:55',
      },
      targetStamina: {
        seconds: 123,
        time: '39:00',
      },
    }
    result.current.action.add(secondAddition)
    const [firstItem, secondItem] = result.current.list

    expect(firstItem.targetStamina).toEqual(firstAddition.targetStamina)
    expect(firstItem.currentStamina).toEqual(firstAddition.currentStamina)

    expect(secondItem.targetStamina).toEqual(secondAddition.targetStamina)
    expect(secondItem.currentStamina).toEqual(secondAddition.currentStamina)
  })

  test.todo('`update` should update data for a specific `key`')

  test.todo('`remove` should remove data for a specific `key`')
})
