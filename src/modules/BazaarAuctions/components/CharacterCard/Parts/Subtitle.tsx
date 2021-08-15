import styled from 'styled-components'

interface SubtitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  level: number
  vocation: number
}

const vocationEnum = {
  '0': 'None',
  '1': 'Elite Knight',
  '2': 'Royal Paladin',
  '3': 'Master Sorcerer',
  '4': 'Elder Druid',
  '10': 'None',
  '11': 'Knight',
  '12': 'Paladin',
  '13': 'Sorcerer',
  '14': 'Druid',
} as Record<string, string>

const Description = styled.span`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.5px;
  color: var(--onSurface);
`

const Subtitle = ({ level, vocation }: SubtitleProps): JSX.Element => (
  <Description>
    Level {level}
    {' - '}
    {level >= 20 ? vocationEnum[vocation] : vocationEnum[`1${vocation}`]}
  </Description>
)

export default Subtitle
