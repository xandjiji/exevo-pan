import { memo } from 'react'
import { Switch, RadioGroup, RadioButton } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import * as S from './styles'
import { SortingDialogProps } from './types'

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
        <RadioGroup
          indexValue={sortMode}
          onChange={index => setSortMode(index)}
          aria-label="Sort characters by"
        >
          <RadioButton>Auction End</RadioButton>
          <RadioButton>Level</RadioButton>
          <RadioButton>Price</RadioButton>
          <RadioButton>Price (bidded only)</RadioButton>
        </RadioGroup>
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
