import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import MainIcon from 'assets/svgs/calculator.svg'
import ExerciseWeaponIcon from 'assets/svgs/weight.svg'

const Header = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  const navItems = [
    {
      title: calculators.Header.Main,
      href: routes.CALCULATORS,
      icon: <MainIcon />,
    },
    {
      title: calculators.Header.ExerciseWeapons,
      href: routes.EXERCISE_WEAPONS,
      icon: <ExerciseWeaponIcon />,
    },
    {
      title: calculators.Header.LowBlow,
      href: routes.LOW_BLOW,
      icon: <ExerciseWeaponIcon />,
    },
  ]

  return <SubHeader navItems={navItems} />
}

export default memo(Header)
