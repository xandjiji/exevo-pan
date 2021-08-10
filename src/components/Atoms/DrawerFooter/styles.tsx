import styled, { css } from 'styled-components'
import { ReactComponent as GithubSvg } from 'assets/svgs/github.svg'
import { InnerContainer, Clickable } from 'styles'

const typographyStyle = css`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onPrimary};
`

export const Wrapper = styled.footer`
  ${InnerContainer}
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};

  ${typographyStyle}
  font-weight: 300;
`

export const GithubIcon = styled(GithubSvg)`
  margin-right: 16px;
  padding: 0;
  border-radius: 50%;
  fill: ${({ theme }) => theme.colors.onPrimary};

  ${Clickable}
`

export const RepositoryLink = styled.a`
  font-size: 0;
`

export const ProfileLink = styled.a`
  margin-left: 3px;

  ${typographyStyle}
  font-weight: 400;
  letter-spacing: 0.2px;
`
