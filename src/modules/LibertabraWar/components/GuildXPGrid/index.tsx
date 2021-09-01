import { useWarStatisticsData } from 'contexts/useDatabase'
import ScoreboardXP from './ScoreboardXP'
import * as S from './styles'

const GuildXPGrid = (): JSX.Element => {
  const { warStatisticsData } = useWarStatisticsData()

  /* @ ToDo: skeleton */
  if (!warStatisticsData) return <S.Loading />
  const {
    xpStats: { todayDiff, lastDiff },
  } = warStatisticsData
  return (
    <S.Wrapper>
      <S.PageTitle>Get live statistics for Libertabra War!</S.PageTitle>
      <ScoreboardXP
        guildA={{
          name: 'Libertabra Pune',
          todayDiff: todayDiff.guildA,
          lastDiff: lastDiff.guildA,
          href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Libertabra%20Pune&onlyshowonline=0',
        }}
        guildB={{
          name: 'Bones Alliance',
          todayDiff: todayDiff.guildB,
          lastDiff: lastDiff.guildB,
          href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Bones%20Alliance&onlyshowonline=0',
        }}
      />
    </S.Wrapper>
  )
}

export default GuildXPGrid
