import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { Switch, RadioButton } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import * as S from './styles'
import { SortingDialogProps } from './types'

const sortModes = ['Auction end', 'Level', 'Price', 'Price (bidded only)']
const sortModesTranslationKey = {
  'Auction end': 'auctionEnd',
  Level: 'level',
  Price: 'price',
  'Price (bidded only)': 'priceBidded',
} as Record<string, string>

const SortingDialog = ({
  sortMode,
  setSortMode,
  descendingOrder,
  setDescendingOrder,
  ...props
}: SortingDialogProps): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  return (
    <Tooltip
      role="dialog"
      trigger="click"
      content={
        <S.Dialog {...props}>
          <Switch
            active={descendingOrder}
            onClick={() => setDescendingOrder((prev) => !prev)}
            aria-label={homepage.CharacterGrid.descendingSwitchLabel}
          >
            {homepage.CharacterGrid.descending}
          </Switch>
          {sortModes.map((mode, index) => (
            <RadioButton
              key={mode}
              onClick={() => setSortMode(index)}
              active={sortMode === index}
            >
              {homepage.CharacterGrid.sortModes[sortModesTranslationKey[mode]]}
            </RadioButton>
          ))}
        </S.Dialog>
      }
    >
      <S.SortIcon
        aria-label={homepage.CharacterGrid.sortingButtonLabel}
        aria-haspopup="dialog"
      />
    </Tooltip>
  )
}

export default memo(SortingDialog)
