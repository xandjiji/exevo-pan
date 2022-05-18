import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { memo, useCallback } from 'react'
import { formatNumberWithCommas } from 'utils'
import List from '../List'
import { HighscoresGridProps } from './types'

const HighscoresGrid = ({
  statisticsData,
  className,
  style,
  ...props
}: HighscoresGridProps) => {
  const {
    translations: { statistics },
  } = useTranslations()

  return (
    <div
      className={clsx('inner-container grid gap-6 py-4', className)}
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        ...style,
      }}
      {...props}
    >
      <h2 className="hidden">{statistics.HighscoresGrid.title}</h2>
      <List
        title={statistics.HighscoresGrid.top10BidTitle}
        charactersList={statisticsData.top10Bid}
        displayedDataKey="currentBid"
        format={useCallback(
          (value: number) => `${formatNumberWithCommas(value)} TC`,
          [],
        )}
      />
      <List
        title="Level"
        charactersList={statisticsData.top10Level}
        displayedDataKey="level"
        format={formatNumberWithCommas}
      />
      <List
        title="Magic"
        charactersList={statisticsData.top10Magic}
        displayedDataKey="magic"
      />
      <List
        title="Distance"
        charactersList={statisticsData.top10Distance}
        displayedDataKey="distance"
      />
      <List
        title="Sword"
        charactersList={statisticsData.top10Sword}
        displayedDataKey="sword"
      />
      <List
        title="Axe"
        charactersList={statisticsData.top10Axe}
        displayedDataKey="axe"
      />
      <List
        title="Club"
        charactersList={statisticsData.top10Club}
        displayedDataKey="club"
      />
      <List
        title="Fist"
        charactersList={statisticsData.top10Fist}
        displayedDataKey="fist"
      />
      <List
        title="Shielding"
        charactersList={statisticsData.top10Shielding}
        displayedDataKey="shielding"
      />
      <List
        title="Fishing"
        charactersList={statisticsData.top10Fishing}
        displayedDataKey="fishing"
      />
    </div>
  )
}

export default memo(HighscoresGrid)
