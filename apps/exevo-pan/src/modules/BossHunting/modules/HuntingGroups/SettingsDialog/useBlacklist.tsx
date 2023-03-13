import { useState } from 'react'
import { utils } from '../../../blacklist'

export { bossNames } from '../../../blacklist'

export const useBlacklist = (initialValue: string | null) => {
  const [string, setString] = useState(initialValue ?? '')

  const bossSet = utils.split(string)

  const toggleValue = (value: string) => {
    if (bossSet.has(value)) {
      bossSet.delete(value)
    } else {
      bossSet.add(value)
    }

    setString(utils.join(bossSet))
  }

  return { value: { string, set: bossSet }, toggleValue }
}
