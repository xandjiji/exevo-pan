import { useEffect } from 'react'
import StatisticsGrid from 'components/StatisticsGrid'

const Statistics = (): JSX.Element => {
  useEffect(() => {
    document.title = `Exevo Pan - Statistics`
  }, [])

  return <StatisticsGrid />
}

export default Statistics
