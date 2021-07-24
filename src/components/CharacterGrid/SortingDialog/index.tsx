import { Switch, RadioGroup, RadioButton } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import * as S from './styles'
import { SortingDialogProps } from './types'

const SortingDialog = ({
  sortModeControl,
  descendingOrderControl,
  ...props
}: SortingDialogProps): JSX.Element => {
  const [sortMode, setSortMode] = sortModeControl
  const [descendingOrder, setDescendingOrder] = descendingOrderControl

  return (
    <Tooltip
      role="dialog"
      aria-label="Set the sorting order and criteria"
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
      <S.SortIcon aria-haspopup="dialog" />
    </Tooltip>
  )
}

export default SortingDialog
