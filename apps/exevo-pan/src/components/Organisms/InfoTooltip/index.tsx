import clsx from 'clsx'
import { InfoIcon } from 'assets/svgs'
import Tooltip from '../Tooltip'
import { InfoTooltipProps } from './types'

const InfoTooltip = ({
  content,
  labelSize = false,
  className,
  ...props
}: InfoTooltipProps) => (
  <span
    className={clsx('shrink-0', labelSize && 'h-3 w-3', className)}
    {...props}
  >
    <Tooltip content={<>{content}</>} offset={[0, 6]}>
      <InfoIcon
        className={clsx(
          'fill-onSurface',
          labelSize ? 'h-3 w-3' : 'h-full w-full',
          className,
        )}
      />
    </Tooltip>
  </span>
)

InfoTooltip.LabelWrapper = ({
  className,
  ...props
}: JSX.IntrinsicElements['span']) => (
  <span className={clsx('flex items-center gap-1', className)} {...props} />
)

export default InfoTooltip
