import { links, email } from 'Constants'
import * as S from './styles'

const ContactSection = (): JSX.Element => (
  <S.Ul>
    <S.ButtonLi>
      <S.MailIcon />
      <a href={links.EMAIL} target="_blank" rel="noopener noreferrer">
        {email.MY_EMAIL}
      </a>
    </S.ButtonLi>
    <S.ButtonLi>
      <S.GithubIcon />
      <a
        href={links.GITHUB_PROFILE}
        target="_blank"
        rel="noopener noreferrer external author"
      >
        {links.GITHUB_PROFILE}
      </a>
    </S.ButtonLi>
    <S.ButtonLi>
      <S.LinkedinIcon />
      <a
        href={links.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer external author"
      >
        {links.LINKEDIN}
      </a>
    </S.ButtonLi>
  </S.Ul>
)

export default ContactSection
