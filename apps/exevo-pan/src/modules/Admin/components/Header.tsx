import { memo } from 'react'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import { AdvertiseIcon, ApproveUserIcon, MoneyIcon } from 'assets/svgs'

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
  {
    title: 'Withdraws',
    href: routes.ADMIN.WITHDRAWS,
    icon: <MoneyIcon />,
  },
]

const Header = () => <SubHeader navItems={navItems} />

export default memo(Header)
