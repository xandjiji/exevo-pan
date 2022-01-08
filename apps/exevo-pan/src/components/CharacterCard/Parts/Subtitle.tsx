import styled from 'styled-components'
import { vocation as vocationHelper } from 'shared-utils/dist/vocations'

interface SubtitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  level: number
  vocation: number
}

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
    {vocationHelper.getFullName(vocation, level)}
  </Description>
)

export default Subtitle
