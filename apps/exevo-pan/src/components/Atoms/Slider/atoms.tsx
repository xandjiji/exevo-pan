import { memo } from 'react'

const DEFAULT_EXTENDED_AREA = 32

export const ExtendedClickableArea = memo(() => (
  <div
    role="none"
    className="absolute top-1/2 left-1/2"
    style={{
      transform: 'translate(-50%, -50%)',
      width: `calc(100% + ${DEFAULT_EXTENDED_AREA}px)`,
      height: `calc(100% + ${DEFAULT_EXTENDED_AREA}px)`,
    }}
  />
))

export const FullscreenClickable = memo(() => (
  <div
    role="none"
    className="z-99 fixed top-0 left-0 hidden h-screen w-screen group-active:block"
  />
))
