import { useState, useEffect } from 'react'
import * as S from './styles'
import { SkillBarProps } from './types'
import { getDecimalPart } from './utils'

const SkillBar = ({
  skillName,
  skillValue,
  highlight = false,
  ...props
}: SkillBarProps): JSX.Element => {
  const [progressPercentage, setProgressPercentage] = useState<string>('0%')
  useEffect(() => {
    setProgressPercentage(`${getDecimalPart(skillValue)}%`)
  }, [skillValue])

  return (
    <S.Wrapper title={progressPercentage} highlight={highlight} {...props}>
      <S.Value>{Math.floor(skillValue)}</S.Value>
      <S.Info skillName={skillName}>
        <S.ProgressBar>
          <S.BarFill style={{ width: progressPercentage }} />
        </S.ProgressBar>
      </S.Info>
    </S.Wrapper>
  )
}

export default SkillBar
