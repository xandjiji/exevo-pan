import { Popover } from 'components/Atoms'
import { PopoverProps } from 'components/Atoms/Popover/types'
import * as S from './styles'

const Tooltip = ({
  children,
  content,
  placement = 'top',
  trigger = 'hover',
  visible = false,
  offset = [-18, 21],
  ...props
}: PopoverProps): JSX.Element => (
  <Popover
    content={<S.TooltipWrapper {...props}>{content}</S.TooltipWrapper>}
    placement={placement}
    trigger={trigger}
    visible={visible}
    offset={offset}
  >
    {children}
  </Popover>
)

export default Tooltip
