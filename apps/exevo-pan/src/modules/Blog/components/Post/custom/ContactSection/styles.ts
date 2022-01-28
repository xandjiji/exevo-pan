import styled, { css } from 'styled-components'
import { MaterialCard } from 'styles'
import MailSvg from 'assets/svgs/mail.svg'
import GithubSvg from 'assets/svgs/github.svg'
import LinkedinSvg from 'assets/svgs/linkedin.svg'

export const Ul = styled.ul`
  width: fit-content;
  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`

export const Li = styled.li`
  display: flex;
  align-items: center;

  font-size: 16px;
  font-weight: 300;

  &::before {
    content: '·';
    margin-right: 4px;
    font-weight: 700;
  }
`

export const ButtonLi = styled.li`
  ${MaterialCard}
  padding: 12px 24px;
  display: flex;
  align-items: center;
  background-color: var(--primary);
  font-size: 12px;
  box-shadow: none;

  &&::before {
    content: unset;
  }

  a {
    color: var(--onPrimary);
    line-height: 1.6;
    transition: transform 0.2s ease-out;

    &:hover {
      transform: translateX(2px);
    }

    &::after {
      content: unset;
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
