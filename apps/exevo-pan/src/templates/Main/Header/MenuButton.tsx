import clsx from 'clsx'

export type MenuIconProps = {
  open: boolean
}

const Rect = ({ className, ...props }: JSX.IntrinsicElements['rect']) => (
  <rect
    className={clsx('origin-center transition-all', className)}
    width="16"
    height="2"
    x="4"
    {...props}
  />
)

export default ({
  'aria-checked': isOpen,
  ...props
}: JSX.IntrinsicElements['button']) => (
  <button
    className="clickable h-9 w-9 rounded p-[2px] md:hidden"
    type="button"
    role="switch"
    aria-checked={isOpen}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="fill-onPrimary h-full w-full"
    >
      <Rect
        y="6"
        style={
          isOpen
            ? { transform: 'translate(-4px, 4px) rotate(45deg)' }
            : undefined
        }
      />
      <Rect y="11" style={{ opacity: isOpen ? '0' : '1' }} />
      <Rect
        y="16"
        style={
          isOpen
            ? { transform: 'translate(-4px, -3px) rotate(-45deg)' }
            : undefined
        }
      />
    </svg>
  </button>
)
