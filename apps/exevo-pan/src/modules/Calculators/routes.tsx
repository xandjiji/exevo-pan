import { useMemo, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import type { NavItem, NavGridItem } from 'templates'
import { routes } from 'Constants'
import {
  CalculatorIcon,
  WeightIcon,
  CharmsIcon,
  ChargeIcon,
  MagicIcon,
  BalanceIcon,
  MoneyIcon,
} from 'assets/svgs'

type CalculatorRoute = NavItem & NavGridItem & { hero: string }

export const useRoutes = () => {
  const {
    translations: { calculators },
  } = useTranslations()

  const list: CalculatorRoute[] = useMemo(
    () => [
      {
        title: calculators.Meta.Main.title,
        href: routes.CALCULATORS,
        icon: <CalculatorIcon />,
        hero: '/calculators/calculators-hero.png',
        sprite: '/sprites/bricklayer.gif',
        description: calculators.Meta.Main.description,
      },
      {
        title: calculators.Meta.AuctionEstimation.title,
        href: routes.AUCTION_ESTIMATION,
        icon: <MoneyIcon />,
        hero: `${routes.CALCULATORS}/estimator.png`,
        sprite: '/sprites/estimator.png',
        description: calculators.Meta.AuctionEstimation.description,
      },
      {
        title: calculators.Meta.ExerciseWeapons.title,
        href: routes.EXERCISE_WEAPONS,
        icon: <WeightIcon />,
        hero: `${routes.CALCULATORS}/exercise-weapons-hero.png`,
        sprite: '/sprites/store/lasting exercise sword.gif',
        description: calculators.Meta.ExerciseWeapons.description,
      },
      {
        title: calculators.Meta.LootSplit.title,
        href: routes.LOOT_SPLIT,
        icon: <BalanceIcon />,
        hero: `${routes.CALCULATORS}/loot-split-hero.png`,
        sprite: '/sprites/loot.png',
        description: calculators.Meta.LootSplit.description,
      },
      {
        title: calculators.Meta.Stamina.title,
        href: routes.STAMINA,
        icon: <ChargeIcon />,
        hero: `${routes.CALCULATORS}/stamina-hero.png`,
        sprite: '/sprites/sleeping.png',
        description: calculators.Meta.Stamina.description,
      },
      {
        title: calculators.Meta.ImbuementsCost.title,
        href: routes.IMBUEMENTS_COST,
        icon: <MagicIcon />,
        hero: `${routes.CALCULATORS}/imbuements-cost-hero.png`,
        sprite: '/sprites/imbuement.png',
        description: calculators.Meta.ImbuementsCost.description,
      },
      {
        title: calculators.Meta.CharmDamage.title,
        href: routes.CHARM_DAMAGE,
        icon: <CharmsIcon />,
        hero: `${routes.CALCULATORS}/charm-damage-hero.png`,
        sprite: '/sprites/charms/Charm.png',
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
