import { memo } from 'react'
import clsx from 'clsx'
import { Link } from 'components/Atoms'
import HeaderIcon from '../Main/Header/HeaderIcon'
import { SubHeaderProps } from './types'

const SubHeader = ({ navItems, className, ...props }: SubHeaderProps) => (
  <nav
    className={clsx(
      'z-1 inner-container bg-darkerPrimary md:custom-scrollbar sticky top-[60px] overflow-auto shadow-md transition-all',
      className,
    )}
    {...props}
  >
    <ul className="flex items-center">
      {navItems.map((navItem) => (
        <li key={navItem.title}>
          <Link
            href={navItem.href}
            exact
            className="hover:border-onPrimary currentpage:border-onPrimary flex cursor-pointer items-center border-solid border-transparent px-5 pt-[13px] pb-2.5 transition-colors"
            style={{ borderWidth: 0, borderBottomWidth: 3 }}
          >
            <>
              <HeaderIcon icon={navItem.icon} spaced />
              <h3 className="text-s text-onPrimary whitespace-nowrap font-normal tracking-wider">
                {navItem.title}
              </h3>
            </>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default memo(SubHeader)
