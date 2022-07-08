import { routes as ROUTES } from 'Constants'
import MainIcon from 'assets/svgs/calculator.svg'
import ExerciseWeaponIcon from 'assets/svgs/weight.svg'
import CharmDamageIcon from 'assets/svgs/charms.svg'
import StaminaIcon from 'assets/svgs/charge.svg'
import ImbuementsCostIcon from 'assets/svgs/magic.svg'
import { CalculatorRoute } from './types'

export const Main: CalculatorRoute = {
  title: 'Main',
  href: ROUTES.CALCULATORS,
  icon: <MainIcon />,
  hero: '/calculators/calculators-hero.png',
  sprite: '/sprites/bricklayer.gif',
}

export const ExerciseWeapons: CalculatorRoute = {
  title: 'ExerciseWeapons',
  href: ROUTES.EXERCISE_WEAPONS,
  icon: <ExerciseWeaponIcon />,
  hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
  sprite: '/sprites/store/lasting exercise sword.gif',
}

export const ImbuementsCost: CalculatorRoute = {
  title: 'ImbuementsCost',
  href: ROUTES.IMBUEMENTS_COST,
  icon: <ImbuementsCostIcon />,
  hero: `${ROUTES.CALCULATORS}/imbuements-cost-hero.png`,
  sprite: '/sprites/imbuement.png',
}

export const Stamina: CalculatorRoute = {
  title: 'Stamina',
  href: ROUTES.STAMINA,
  icon: <StaminaIcon />,
  hero: `${ROUTES.CALCULATORS}/stamina-hero.png`,
  sprite: '/sprites/sleeping.png',
}

export const CharmDamage: CalculatorRoute = {
  title: 'CharmDamage',
  href: ROUTES.CHARM_DAMAGE,
  icon: <CharmDamageIcon />,
  hero: `${ROUTES.CALCULATORS}/charm-damage-hero.png`,
  sprite: '/sprites/charms/Charm.png',
}

export const routes: CalculatorRoute[] = [
  Main,
  ExerciseWeapons,
  ImbuementsCost,
  Stamina,
  CharmDamage,
]
