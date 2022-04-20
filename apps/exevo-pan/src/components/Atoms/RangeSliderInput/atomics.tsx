import { forwardRef } from 'react'
import clsx from 'clsx'
import { TrackFillProps } from './types'

export const ValueDisplay = (args: JSX.IntrinsicElements['span']) => (
  <span
    className="bg-primaryVariant text-tsm text-onSurface w-10 shrink-0 rounded-lg py-[7px] text-center outline-none"
    {...args}
  />
)

export const Cursor = (args: JSX.IntrinsicElements['div']) => (
  <span
    className="bg-primary pointer-events-none absolute top-1/2 left-0 -mt-2 -ml-2 h-4 w-4 rounded-full shadow-md"
    {...args}
  />
)

export const TrackFill = forwardRef(
  ({ className, children, isMousePressed, ...props }: TrackFillProps, ref) => (
    <div
      className={clsx(
        'bg-primaryVariant relative h-1 w-full cursor-pointer shadow',
        className,
      )}
      {...props}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div
        role="none"
        className="absolute top-1/2 left-1/2"
        style={{
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% + 30px)',
          height: 'calc(100% + 30px)',
        }}
      />

      {isMousePressed && (
        <div className="z-99 fixed top-0 left-0 h-screen w-screen" />
      )}
      {children}
    </div>
  ),
)
