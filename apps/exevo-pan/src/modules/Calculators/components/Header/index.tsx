import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { SubHeader } from 'templates'
import { routes } from '../../routes'

const Header = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  const navItems = routes.map(({ title, href, icon }) => ({
    title: calculators.Header[title],
    href,
    icon,
  }))

  return <SubHeader navItems={navItems} />
}

export default memo(Header)
