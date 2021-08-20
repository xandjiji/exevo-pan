import styled, { css } from 'styled-components'
import { InnerContainer, MaterialCard, Smooth } from 'styles'
import MailSvg from 'assets/svgs/mail.svg'
import GithubSvg from 'assets/svgs/github.svg'
import LinkedinSvg from 'assets/svgs/linkedin.svg'

export const Wrapper = styled.main`
  ${InnerContainer}
`

export const SurfaceWrapper = styled.div`
  ${MaterialCard}
  ${InnerContainer}
  padding-top: 32px;
  padding-bottom: 32px;
`

export const Section = styled.section`
  &:not(:last-child) {
    padding-bottom: 32px;
    margin-bottom: 32px;
    border-bottom: solid 1px var(--separator);
  }
`

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;

  strong {
    font-weight: 600;
  }

  a {
    position: relative;
    color: var(--primary);
    filter: brightness(130%);

    ${Smooth}

    &::selection {
      background: var(--primary);
      color: var(--onPrimary);
    }

    &:hover {
      opacity: 0.75;
    }

    &::after {
      content: '';
      position: absolute;
      top: calc(100% - 1px);
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--primary);
    }
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`

export const Anchor = styled.a`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: var(--separator);
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 0.5px;

  && {
    color: var(--onSurface);
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

export const Link = styled.a``

export const H2 = styled.h2`
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 300;
  letter-spacing: 0.5px;
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
  background-color: var(--primary);
  display: flex;
  align-items: center;
  font-size: 12px;
  box-shadow: none;

  ${Link} {
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
