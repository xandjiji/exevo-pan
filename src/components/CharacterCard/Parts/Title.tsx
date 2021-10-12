import { useTranslations } from 'contexts/useTranslation'
import styled from 'styled-components'
import { Clickable } from 'styles'
import ExternalIconSvg from 'assets/svgs/external.svg'

interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  characterId: number
  highlighted: boolean
}

const Nickname = styled.p<{ highlighted: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ highlighted }) =>
    highlighted ? 'var(--green)' : 'var(--primary)'};
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
  fill: var(--onSurface);
  ${Clickable}
`
const Title = ({
  children,
  characterId,
  ...props
}: TitleProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <Nickname {...props}>
      {children}
      <a
        href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${characterId}&source=overview`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <ExternalIcon />
        {common.CharacterCard.linkLabel}
      </a>
    </Nickname>
  )
}

export default Title
