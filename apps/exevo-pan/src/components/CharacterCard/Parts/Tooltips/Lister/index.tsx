import { memo, useMemo } from 'react'
import clsx from 'clsx'
import { ListerProps } from './types'

const Lister = ({ maxLines, partialList, fullList }: ListerProps) => {
  const partialSet = useMemo(
    () => new Set<string>([...partialList]),
    [partialList],
  )

  return (
    <ul
      className={clsx(maxLines && 'grid grid-flow-col gap-y-0 gap-x-4')}
      style={{ gridTemplateRows: `repeat(${maxLines}, 1fr)` }}
    >
      {fullList.map((item) => (
        <li
          key={item}
          className={clsx(
            "text-tsm text-onSurface block text-left before:mr-1 before:font-bold before:content-['·']",
            !partialSet.has(item) && 'font-light opacity-50',
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default memo(Lister)
