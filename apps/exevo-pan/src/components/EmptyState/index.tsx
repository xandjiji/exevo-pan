import clsx from 'clsx'
import { loadRawSrc } from 'utils'
import { Button, FadeImage } from 'components/Atoms'
import { EmptyStateProps } from './types'

const notFoundSrc = loadRawSrc('/assets/notFound.png')

const EmptyState = ({
  variant,
  text,
  button,
  nowrap = false,
  className,
  children,
  ...props
}: EmptyStateProps) => (
  <div
    className={clsx('relative rounded-3xl text-center', className)}
    {...props}
  >
    <div
      className="pointer-events-none select-none"
      style={{ filter: 'grayscale(0.3)', opacity: 0.2 }}
    >
      <FadeImage
        src={notFoundSrc}
        alt={text}
        height={{ small: 96, medium: 124, large: 196 }[variant]}
      />
    </div>

    <div className="absolute-centered flex flex-col items-center gap-3">
      <span
        className={clsx(
          'text-onSurface block text-center',
          nowrap && 'whitespace-nowrap',
          {
            small: 'text-2xl',
            medium: 'text-2xl md:text-[32px]',
            large: 'text-[32px] md:text-[36px]',
          }[variant],
        )}
      >
        {text}
      </span>
      {children}
      {button && (
        <Button type="button" onClick={button.action}>
          {button.content}
        </Button>
      )}
    </div>
  </div>
)

export default EmptyState
