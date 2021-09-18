import styled from 'styled-components'
import SkillBar from './SkillBar'

interface CharacterSkillsProps extends React.HTMLAttributes<HTMLDivElement> {
  skills: CharacterSkillsObject
}

const Wrapper = styled.div`
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 8px;
`

const CharacterSkills = ({
  skills,
  ...props
}: CharacterSkillsProps): JSX.Element => {
  const highlightedSkillValue = Math.max(...(Object.values(skills) as number[]))
  return (
    <Wrapper {...props}>
      {Object.keys(skills).map((skillName) => {
        const skillValue = skills[skillName as keyof CharacterSkillsObject]
        return (
          <SkillBar
            key={skillName}
            skillName={skillName}
            skillValue={skillValue}
            highlight={highlightedSkillValue === skillValue}
          />
        )
      })}
    </Wrapper>
  )
}

export default CharacterSkills
