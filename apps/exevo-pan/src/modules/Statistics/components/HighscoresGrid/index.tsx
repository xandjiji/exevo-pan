import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import List from '../List'
import { pickFromCharacter, format } from './utils'
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
        pickFromCharacter={pickFromCharacter.currentBid}
        formatCharacterValue={format.tc}
      />
      <List
        title="Level"
        charactersList={statisticsData.top10Level}
        pickFromCharacter={pickFromCharacter.level}
        formatCharacterValue={format.numberWithCommas}
      />
      <List
        title="Magic"
        charactersList={statisticsData.top10Magic}
        pickFromCharacter={pickFromCharacter.skills.magic}
      />
      <List
        title="Distance"
        charactersList={statisticsData.top10Distance}
        pickFromCharacter={pickFromCharacter.skills.distance}
      />
      <List
        title="Sword"
        charactersList={statisticsData.top10Sword}
        pickFromCharacter={pickFromCharacter.skills.sword}
      />
      <List
        title="Axe"
        charactersList={statisticsData.top10Axe}
        pickFromCharacter={pickFromCharacter.skills.axe}
      />
      <List
        title="Club"
        charactersList={statisticsData.top10Club}
        pickFromCharacter={pickFromCharacter.skills.club}
      />
      <List
        title="Fist"
        charactersList={statisticsData.top10Fist}
        pickFromCharacter={pickFromCharacter.skills.fist}
      />
      <List
        title="Shielding"
        charactersList={statisticsData.top10Shielding}
        pickFromCharacter={pickFromCharacter.skills.shielding}
      />
      <List
        title="Fishing"
        charactersList={statisticsData.top10Fishing}
        pickFromCharacter={pickFromCharacter.skills.fishing}
      />
    </div>
  )
}

export default memo(HighscoresGrid)
