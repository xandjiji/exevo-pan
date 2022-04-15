import { cloneElement } from 'react'
import clsx from 'clsx'

type HeaderIconProps = {
  icon: React.ReactElement
  spaced?: boolean
}

export default ({ icon, spaced = false }: HeaderIconProps) =>
  cloneElement(icon, {
    className: clsx('w-[18px] h-[18px] fill-onPrimary', spaced && 'mr-[6px]'),
  })
