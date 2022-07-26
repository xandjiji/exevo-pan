import clsx from 'clsx'
import SkillBar from './SkillBar'

interface CharacterSkillsProps extends React.HTMLAttributes<HTMLDivElement> {
  skills: CharacterSkillsObject
}

const CharacterSkills = ({
  skills,
  className,
  ...props
}: CharacterSkillsProps) => {
  const highlightedSkillValue = Math.max(...(Object.values(skills) as number[]))
  return (
    <div
      className={clsx('mb-1 grid grid-cols-2 gap-x-4 gap-y-2', className)}
      {...props}
    >
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
    </div>
  )
}

export default CharacterSkills
