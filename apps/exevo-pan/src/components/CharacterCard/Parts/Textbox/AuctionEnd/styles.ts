import styled from 'styled-components'
import { AuctionTimer as BaseAuctionTimer } from 'components/Atoms'

export const AuctionTimer = styled(BaseAuctionTimer)`
  font-size: 14px;
  *,
  + span {
    font-size: 14px;
  }
`
