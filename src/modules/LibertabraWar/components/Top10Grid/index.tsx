import { useWarStatisticsData } from 'contexts/useDatabase'
import * as S from './styles'

const Top10Grid = (): JSX.Element => {
  const { warStatisticsData } = useWarStatisticsData()

  /* @ ToDo: skeleton */
  if (!warStatisticsData) return <S.Loading />
  return <S.Wrapper>asda</S.Wrapper>
}

export default Top10Grid
