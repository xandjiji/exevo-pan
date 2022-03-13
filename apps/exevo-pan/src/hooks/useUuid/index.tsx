import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const useUuid = (prefix?: string): string => {
  const [uuid] = useState(`${prefix ? `${prefix}-` : ''}${uuidv4()}`)

  return uuid
}

export default useUuid
