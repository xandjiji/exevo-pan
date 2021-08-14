import styled from 'styled-components'
import { Clickable } from 'styles'
import ExternalIconSvg from 'assets/svgs/external.svg'

interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  characterId: number
}

const Nickname = styled.p`
  margin-bottom: -3px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  filter: brightness(130%);

  a {
    margin-left: 4px;
    font-size: 0;
  }
`
const ExternalIcon = styled(ExternalIconSvg)`
  padding: 2px;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  fill: ${({ theme }) => theme.colors.onSurface};
  ${Clickable}
`
const Title = ({
  children,
  characterId,
  ...props
}: TitleProps): JSX.Element => (
  <Nickname {...props}>
    {children}
    <a
      href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${characterId}&source=overview`}
      target="_blank"
      rel="noreferrer"
    >
      <ExternalIcon />
      Go to character page
    </a>
  </Nickname>
)

export default Title
