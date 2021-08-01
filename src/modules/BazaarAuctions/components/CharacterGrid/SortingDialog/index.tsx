import { memo } from 'react'
import { Switch, RadioButton } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import * as S from './styles'
import { SortingDialogProps } from './types'

const sortModes = ['Auction end', 'Level', 'Price', 'Price (bidded only)']

const SortingDialog = ({
  sortMode,
  setSortMode,
  descendingOrder,
  setDescendingOrder,
  ...props
}: SortingDialogProps): JSX.Element => (
  <Tooltip
    role="dialog"
    trigger="click"
    content={
      <S.Dialog {...props}>
        <Switch
          active={descendingOrder}
          onClick={() => setDescendingOrder(prev => !prev)}
          aria-label="Sort by descending order"
        >
          Descending
        </Switch>
        {sortModes.map((mode, index) => (
          <RadioButton
            key={mode}
            onClick={() => setSortMode(index)}
            active={sortMode === index}
          >
            {mode}
          </RadioButton>
        ))}
      </S.Dialog>
    }
  >
    <S.SortIcon
      aria-label="Set the sorting order and criteria"
      aria-haspopup="dialog"
    />
  </Tooltip>
)

export default memo(SortingDialog)
