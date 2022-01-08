import styled, { css } from 'styled-components'
import { InnerContainer, InnerPadding, MaterialCard } from 'styles'
import MailSvg from 'assets/svgs/mail.svg'
import GithubSvg from 'assets/svgs/github.svg'
import LinkedinSvg from 'assets/svgs/linkedin.svg'

export const Wrapper = styled.main`
  ${InnerContainer}
`

export const BodyLayout = styled.div`
  margin: 0 auto;
  margin-bottom: 32px;
  max-width: clamp(45ch, 50%, 75ch);
`

export const SurfaceWrapper = styled.article`
  ${MaterialCard}
  ${InnerPadding}
  padding-top: 32px;
  padding-bottom: 32px;
  overflow: hidden;
`

export const Anchor = styled.a`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: var(--separator);
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 0.5px;

  && {
    box-shadow: none;
    color: var(--onSurface);
  }

  &:active {
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
  }

  &::before {
    content: '#';
    margin-right: 2px;
    font-family: 'Courier New', Courier, monospace;
  }

  &::after {
    display: none;
  }
`

export const Character = styled.span`
  font-weight: 400;
  color: var(--primary);
`

export const Ul = styled.ul`
  width: fit-content;
  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`

export const Li = styled.li`
  ${MaterialCard}
  padding: 12px 24px;
  display: flex;
  align-items: center;
  background-color: var(--primary);
  font-size: 12px;
  box-shadow: none;

  a {
    color: var(--onPrimary);
    line-height: 1.6;
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
