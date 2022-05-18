import clsx from 'clsx'
import { FadeImage, Button } from 'components/Atoms'
import notFoundSrc from 'assets/notFound.png'
import { EmptyStateProps } from './types'

const EmptyState = ({
  height,
  text,
  button,
  className,
  children,
  ...props
}: EmptyStateProps) => (
  <div
    className={clsx('relative rounded-3xl text-center', className)}
    {...props}
  >
    <FadeImage
      src={notFoundSrc}
      objectFit="scale-down"
      alt={text.content}
      height={height}
      className="mix-blend-overlay"
    />

    <div
      className="absolute top-1/2 left-1/2 flex flex-col items-center gap-3"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <span
        className="text-onSurface block whitespace-nowrap text-center"
        style={{
          fontSize: text.size,
        }}
      >
        {text.content}
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
