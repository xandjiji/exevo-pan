import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { Switch, RadioButton } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import SortIcon from 'assets/svgs/sort.svg'
import { useAuctions } from '../../../contexts/useAuctions'
import { Button } from '../atoms'
import styles from '../styles.module.css'

const sortModes = ['Auction end', 'Level', 'Price', 'Price (bidded only)']
const sortModesTranslationKey = {
  'Auction end': 'auctionEnd',
  Level: 'level',
  Price: 'price',
  'Price (bidded only)': 'priceBidded',
} as Record<string, string>

const SortingDialog = () => {
  const {
    translations: { homepage },
  } = useTranslations()

  const { sortingMode, descendingOrder, dispatch } = useAuctions()

  return (
    <Tooltip
      role="dialog"
      trigger="click"
      placement="bottom"
      content={
        <div className="grid gap-3">
          <Switch
            active={descendingOrder}
            onClick={() => dispatch({ type: 'TOGGLE_DESCENDING_ORDER' })}
            aria-label={homepage.AuctionsGrid.descendingSwitchLabel}
            className="mb-1"
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
        </div>
      }
    >
      <Button
        aria-label={homepage.AuctionsGrid.sortingButtonLabel}
        aria-haspopup="dialog"
      >
        <SortIcon className={styles.icon} />
      </Button>
    </Tooltip>
  )
}

export default memo(SortingDialog)
