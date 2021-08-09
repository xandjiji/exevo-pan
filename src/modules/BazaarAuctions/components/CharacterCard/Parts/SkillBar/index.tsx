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
    const dispatchedAnimation = setTimeout(
      () => setProgressPercentage(`${getDecimalPart(skillValue)}%`),
      0,
    )
    return () => clearTimeout(dispatchedAnimation)
  }, [skillValue])

  return (
    <S.Wrapper title={progressPercentage} highlight={highlight} {...props}>
      <S.Value>{Math.floor(skillValue)}</S.Value>
      <S.ProgressBar skillName={skillName}>
        <S.BarFill style={{ width: progressPercentage }} />
      </S.ProgressBar>
    </S.Wrapper>
  )
}

export default SkillBar
