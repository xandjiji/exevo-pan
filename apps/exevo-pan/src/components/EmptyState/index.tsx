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
    <div
      className="pointer-events-none select-none"
      style={{ filter: 'grayscale(0.3)', opacity: 0.2 }}
    >
      <FadeImage src={notFoundSrc} alt={text.content} height={height} />
    </div>

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
