import { routes as ROUTES } from 'Constants'
import {
  CalculatorIcon,
  WeightIcon,
  CharmsIcon,
  ChargeIcon,
  MagicIcon,
  BalanceIcon,
} from 'assets/svgs'
import { CalculatorRoute } from './types'

export const Main: CalculatorRoute = {
  title: 'Main',
  href: ROUTES.CALCULATORS,
  icon: <CalculatorIcon />,
  hero: '/calculators/calculators-hero.png',
  sprite: '/sprites/bricklayer.gif',
}

export const ExerciseWeapons: CalculatorRoute = {
  title: 'ExerciseWeapons',
  href: ROUTES.EXERCISE_WEAPONS,
  icon: <WeightIcon />,
  hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
  sprite: '/sprites/store/lasting exercise sword.gif',
}

export const ImbuementsCost: CalculatorRoute = {
  title: 'ImbuementsCost',
  href: ROUTES.IMBUEMENTS_COST,
  icon: <MagicIcon />,
  hero: `${ROUTES.CALCULATORS}/imbuements-cost-hero.png`,
  sprite: '/sprites/imbuement.png',
}

export const Stamina: CalculatorRoute = {
  title: 'Stamina',
  href: ROUTES.STAMINA,
  icon: <ChargeIcon />,
  hero: `${ROUTES.CALCULATORS}/stamina-hero.png`,
  sprite: '/sprites/sleeping.png',
}

export const LootSplit: CalculatorRoute = {
  title: 'LootSplit',
  href: ROUTES.LOOT_SPLIT,
  icon: <BalanceIcon />,
  hero: `${ROUTES.CALCULATORS}/loot-split-hero.png`,
  sprite: '/sprites/loot.png',
}

export const CharmDamage: CalculatorRoute = {
  title: 'CharmDamage',
  href: ROUTES.CHARM_DAMAGE,
  icon: <CharmsIcon />,
  hero: `${ROUTES.CALCULATORS}/charm-damage-hero.png`,
  sprite: '/sprites/charms/Charm.png',
}

export const routes: CalculatorRoute[] = [
  Main,
  ExerciseWeapons,
  LootSplit,
  Stamina,
  ImbuementsCost,
  CharmDamage,
]
