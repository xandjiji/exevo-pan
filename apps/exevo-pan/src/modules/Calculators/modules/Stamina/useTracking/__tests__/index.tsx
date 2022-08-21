import { renderHook } from '@testing-library/react-hooks'
import { setup } from 'utils/test'
import { firstAddition, secondAddition } from './mock'
import useTracking from '..'

setup.getFromLocalStorage()

describe('useTracking()', () => {
  test('`add` should append new data to the end of the list', () => {
    const { result } = renderHook(() => useTracking())

    expect(result.current.list).toEqual([])

    result.current.action.add(firstAddition)
    const [addedItem] = result.current.list

    expect(addedItem.targetStamina).toEqual(firstAddition.targetStamina)
    expect(addedItem.currentStamina).toEqual(firstAddition.currentStamina)

    result.current.action.add(secondAddition)
    const [firstItem, secondItem] = result.current.list

    expect(firstItem.targetStamina).toEqual(firstAddition.targetStamina)
    expect(firstItem.currentStamina).toEqual(firstAddition.currentStamina)

    expect(secondItem.targetStamina).toEqual(secondAddition.targetStamina)
    expect(secondItem.currentStamina).toEqual(secondAddition.currentStamina)
  })

  test('`update` should update data for a specific `key`', () => {
    const { result } = renderHook(() => useTracking())

    result.current.action.add(firstAddition)
    result.current.action.add(secondAddition)

    const [previousFirstEntry, previousSecondEntry] = result.current.list

    result.current.action.update({ key: previousFirstEntry.key, name: 'Ksu' })
    expect(result.current.list[0]).not.toEqual(previousFirstEntry)
    expect(result.current.list[0].name).toEqual('Ksu')
    expect(result.current.list[1]).toEqual(previousSecondEntry)
  })

  test('`remove` should remove data for a specific `key`', () => {
    const { result } = renderHook(() => useTracking())

    result.current.action.add(firstAddition)
    result.current.action.add(secondAddition)
    result.current.action.add(firstAddition)

    const [firstEntry, secondEntry, thirdEntry] = result.current.list

    result.current.action.remove(secondEntry.key)

    expect(result.current.list).toEqual([firstEntry, thirdEntry])
  })
})
