import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import MainIcon from 'assets/svgs/calculator.svg'
import ExerciseWeaponIcon from 'assets/svgs/weight.svg'
import CharmDamageIcon from 'assets/svgs/charms.svg'
import StaminaIcon from 'assets/svgs/charge.svg'

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
      title: calculators.Header.CharmDamage,
      href: routes.CHARM_DAMAGE,
      icon: <CharmDamageIcon />,
    },
    {
      title: calculators.Header.Stamina,
      href: routes.STAMINA,
      icon: <StaminaIcon />,
    },
  ]

  return <SubHeader navItems={navItems} />
}

export default memo(Header)
