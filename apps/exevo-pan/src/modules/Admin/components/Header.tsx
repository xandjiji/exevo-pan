import { memo } from 'react'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import { ApproveUserIcon, AdvertiseIcon } from 'assets/svgs'

const navItems = [
  {
    title: 'Exevo Pro',
    href: routes.ADMIN.PRO_PAYMENTS,
    icon: <ApproveUserIcon />,
  },
  {
    title: 'Auction Highlights',
    href: routes.ADMIN.AUCTION_HIGHLIGHTS,
    icon: <AdvertiseIcon />,
  },
]

const Header = () => <SubHeader navItems={navItems} />

export default memo(Header)
