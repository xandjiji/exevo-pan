import { Input } from 'components/Atoms'
import * as S from './styles'

const Newsletter = (
  props: React.HTMLAttributes<HTMLDivElement>,
): JSX.Element => (
  <S.Wrapper {...props}>
    <S.Title>
      Get our <strong>newsletter</strong>
      <br />
      and receive every new content!
      <S.MailboxImage alt="Royal mail" layout="fixed" width={64} height={64} />
    </S.Title>

    <S.FormGroup>
      <S.Label htmlFor="newsletter-email-input">Email</S.Label>
      <Input
        id="newsletter-email-input"
        placeholder="your@email.com"
        allowClear
      />
    </S.FormGroup>
    <S.Button type="button">
      Sign up
      <S.LetterImage
        alt="Stamped letter"
        layout="fixed"
        width={26}
        height={15}
      />
    </S.Button>
  </S.Wrapper>
)

export default Newsletter
