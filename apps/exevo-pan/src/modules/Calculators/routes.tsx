import { useCallback, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import type { NavGridItem, NavItem } from 'templates'
import { routes } from 'Constants'
import {
  BalanceIcon,
  CalculatorIcon,
  ChargeIcon,
  CharmsIcon,
  MagicIcon,
  MoneyIcon,
  WeightIcon,
} from 'assets/svgs'
import { loadCalculatorHero, loadSprite } from 'utils'

type CalculatorRoute = NavItem & NavGridItem & { hero: string }

export const useRoutes = () => {
  const { calculators } = useTranslations()

  const list: CalculatorRoute[] = useMemo(
    () => [
      {
        title: calculators.Meta.Main.title,
        href: routes.CALCULATORS,
        icon: <CalculatorIcon />,
        hero: loadCalculatorHero('calculators-hero.png'),
        sprite: loadSprite('bricklayer.gif'),
        description: calculators.Meta.Main.description,
      },
      {
        title: calculators.Meta.AuctionEstimation.title,
        href: routes.AUCTION_ESTIMATION,
        icon: <MoneyIcon />,
        hero: loadCalculatorHero('estimator.png'),
        sprite: loadSprite('estimator.png'),
        description: calculators.Meta.AuctionEstimation.description,
      },
      {
        title: calculators.Meta.ExerciseWeapons.title,
        href: routes.EXERCISE_WEAPONS,
        icon: <WeightIcon />,
        hero: loadCalculatorHero('exercise-weapons-hero.png'),
        sprite: loadSprite('store/lasting exercise sword.gif'),
        description: calculators.Meta.ExerciseWeapons.description,
      },
      {
        title: calculators.Meta.LootSplit.title,
        href: routes.LOOT_SPLIT,
        icon: <BalanceIcon />,
        hero: loadCalculatorHero('loot-split-hero.png'),
        sprite: loadSprite('loot.png'),
        description: calculators.Meta.LootSplit.description,
      },
      {
        title: calculators.Meta.Stamina.title,
        href: routes.STAMINA,
        icon: <ChargeIcon />,
        hero: loadCalculatorHero('stamina-hero.png'),
        sprite: loadSprite('sleeping.png'),
        description: calculators.Meta.Stamina.description,
      },
      {
        title: calculators.Meta.ImbuementsCost.title,
        href: routes.IMBUEMENTS_COST,
        icon: <MagicIcon />,
        hero: loadCalculatorHero('imbuements-cost-hero.png'),
        sprite: loadSprite('imbuement.png'),
        description: calculators.Meta.ImbuementsCost.description,
      },
      {
        title: calculators.Meta.CharmDamage.title,
        href: routes.CHARM_DAMAGE,
        icon: <CharmsIcon />,
        hero: loadCalculatorHero('charm-damage-hero.png'),
        sprite: loadSprite('/charms/Charm.png'),
        description: calculators.Meta.CharmDamage.description,
      },
    ],
    [calculators],
  )

  return {
    list,
    getRoute: useCallback(
      (route: string) => list.find(({ href }) => href === route),
      [list],
    ),
  }
}
