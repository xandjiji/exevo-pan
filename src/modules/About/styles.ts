import styled, { css } from 'styled-components'
import { InnerContainer, MaterialCard } from 'styles'
import MailSvg from 'assets/svgs/mail.svg'
import GithubSvg from 'assets/svgs/github.svg'
import LinkedinSvg from 'assets/svgs/linkedin.svg'

export const Wrapper = styled.main`
  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: unset;
  }
`

export const Column = styled.section`
  ${MaterialCard}
`

export const H1 = styled.h1``

export const Paragraph = styled.p``

export const Link = styled.a``

export const H2 = styled.h2`
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0.5px;
`

export const Ul = styled.ul`
  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`

export const Li = styled.li`
  ${MaterialCard}
  background-color: var(--primary);
  display: flex;
  align-items: center;
  font-size: 12px;
  box-shadow: none;

  ${Link} {
    color: var(--onPrimary);
    transition: transform 0.2s ease-out;

    &:hover {
      transform: translateX(2px);
    }
  }
`

const IconStyle = css`
  margin-right: 16px;
  width: 18px;
  height: 18px;
  fill: var(--onPrimary);
`
export const MailIcon = styled(MailSvg)`
  ${IconStyle}
`
export const GithubIcon = styled(GithubSvg)`
  ${IconStyle}
`
export const LinkedinIcon = styled(LinkedinSvg)`
  ${IconStyle}
`
