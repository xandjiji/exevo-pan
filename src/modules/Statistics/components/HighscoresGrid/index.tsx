import { memo } from 'react'
import { formatNumberWithCommas } from 'utils'
import List from '../List'
import * as S from './styles'
import { HighscoresGridProps } from './types'

const HighscoresGrid = ({
  statisticsData,
  ...props
}: HighscoresGridProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.PageTitle>
      Tibia Bazaar top 10 characters, ranking and highscores
    </S.PageTitle>
    <List
      title="Bid"
      charactersList={statisticsData.top10Bid}
      displayedDataKey="currentBid"
      format={formatNumberWithCommas}
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
  </S.Wrapper>
)

export default memo(HighscoresGrid)
