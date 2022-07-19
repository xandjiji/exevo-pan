import clsx from 'clsx'
import InfoIcon from 'assets/svgs/info.svg'
import Tooltip from '../Tooltip'
import { InfoTooltipProps } from './types'

const InfoTooltip = ({ content, className, ...props }: InfoTooltipProps) => (
  <span className={clsx('shrink-0', className)} {...props}>
    <Tooltip content={content} offset={[0, 6]}>
      <InfoIcon className={clsx('fill-onSurface h-full w-full', className)} />
    </Tooltip>
  </span>
)

InfoTooltip.LabelWrapper = ({
  className,
  ...props
}: JSX.IntrinsicElements['span']) => (
  <span
    className={clsx(
      'child:w-3 child:h-3 flex items-center gap-1 whitespace-nowrap',
      className,
    )}
    {...props}
  />
)

export default InfoTooltip
