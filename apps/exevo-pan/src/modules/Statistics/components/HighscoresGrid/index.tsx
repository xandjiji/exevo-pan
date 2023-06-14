import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import List from '../List'
import { pickFromCharacter, format } from './utils'
import { HighscoresGridProps } from './types'

const HighscoresGrid = ({
  top10Data,
  className,
  style,
  ...props
}: HighscoresGridProps) => {
  const { statistics } = useTranslations()

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
        charactersList={top10Data.top10Bid}
        pickFromCharacter={pickFromCharacter.currentBid}
        formatCharacterValue={format.tc}
      />
      <List
        title="Level"
        charactersList={top10Data.top10Level}
        pickFromCharacter={pickFromCharacter.level}
        formatCharacterValue={format.numberWithCommas}
      />
      <List
        title="Magic"
        charactersList={top10Data.top10Magic}
        pickFromCharacter={pickFromCharacter.skills.magic}
      />
      <List
        title="Distance"
        charactersList={top10Data.top10Distance}
        pickFromCharacter={pickFromCharacter.skills.distance}
      />
      <List
        title="Sword"
        charactersList={top10Data.top10Sword}
        pickFromCharacter={pickFromCharacter.skills.sword}
      />
      <List
        title="Axe"
        charactersList={top10Data.top10Axe}
        pickFromCharacter={pickFromCharacter.skills.axe}
      />
      <List
        title="Club"
        charactersList={top10Data.top10Club}
        pickFromCharacter={pickFromCharacter.skills.club}
      />
      <List
        title="Fist"
        charactersList={top10Data.top10Fist}
        pickFromCharacter={pickFromCharacter.skills.fist}
      />
      <List
        title="Shielding"
        charactersList={top10Data.top10Shielding}
        pickFromCharacter={pickFromCharacter.skills.shielding}
      />
      <List
        title="Fishing"
        charactersList={top10Data.top10Fishing}
        pickFromCharacter={pickFromCharacter.skills.fishing}
      />
    </div>
  )
}

export default memo(HighscoresGrid)
