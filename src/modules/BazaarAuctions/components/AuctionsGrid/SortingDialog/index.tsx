import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { Switch, RadioButton } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import { useAuctions } from '../../../contexts/useAuctions'
import * as S from './styles'

const sortModes = ['Auction end', 'Level', 'Price', 'Price (bidded only)']
const sortModesTranslationKey = {
  'Auction end': 'auctionEnd',
  Level: 'level',
  Price: 'price',
  'Price (bidded only)': 'priceBidded',
} as Record<string, string>

const SortingDialog = (): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  const { sortingMode, descendingOrder, dispatch } = useAuctions()

  return (
    <Tooltip
      role="dialog"
      trigger="click"
      content={
        <S.Dialog>
          <Switch
            active={descendingOrder}
            onClick={() => dispatch({ type: 'TOGGLE_DESCENDING_ORDER' })}
            aria-label={homepage.AuctionsGrid.descendingSwitchLabel}
          >
            {homepage.AuctionsGrid.descending}
          </Switch>
          {sortModes.map((mode, index) => (
            <RadioButton
              key={mode}
              onClick={() =>
                dispatch({ type: 'SET_SORTING_MODE', value: index })
              }
              active={sortingMode === index}
            >
              {homepage.AuctionsGrid.sortModes[sortModesTranslationKey[mode]]}
            </RadioButton>
          ))}
        </S.Dialog>
      }
    >
      <S.SortIcon
        aria-label={homepage.AuctionsGrid.sortingButtonLabel}
        aria-haspopup="dialog"
      />
    </Tooltip>
  )
}

export default memo(SortingDialog)
