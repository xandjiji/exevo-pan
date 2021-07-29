import styled, { css } from 'styled-components'
import { Tooltip as BaseTooltip } from 'components/Organisms'
import { ReactComponent as ServerSvg } from 'assets/svgs/server.svg'
import { ReactComponent as NoServerSvg } from 'assets/svgs/noserver.svg'
import euFlag from 'assets/eu-flag.png'
import naFlag from 'assets/na-flag.png'
import brFlag from 'assets/br-flag.png'

export const Wrapper = styled.div`
  margin: -4px 0;
  display: flex;
  align-items: center;
`

export const flags = [euFlag, naFlag, brFlag]
export const Flag = styled.img`
  margin-right: 4px;
  width: 16px;
  height: 10px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);
`

export const ServerName = styled.span`
  width: 100%;
  font-size: 14px;
`

export const Tooltip = styled(BaseTooltip)`
  min-width: 240px;
`

export const TooltipText = styled.span`
  font-size: 12px;
`

const IconStyling = css`
  margin-top: 4px;
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors.onSurface};
`
export const Server = styled(ServerSvg)`
  ${IconStyling}
`
export const NoServer = styled(NoServerSvg)`
  ${IconStyling}
`
