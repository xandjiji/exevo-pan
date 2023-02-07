import { routes as ROUTES } from 'Constants'
import { CalculatorIcon, WeightIcon } from 'assets/svgs'
import { BossRoute } from './types'

export const Main: BossRoute = {
  title: 'Main',
  href: ROUTES.BOSSES.MAIN,
  icon: <CalculatorIcon />,
  hero: '/calculators/calculators-hero.png',
  sprite: '/sprites/bricklayer.gif',
}

export const Tracker: BossRoute = {
  title: 'Tracker',
  href: ROUTES.BOSSES.TRACKER,
  icon: <WeightIcon />,
  hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
  sprite: '/sprites/store/lasting exercise sword.gif',
}

export const Guilds: BossRoute = {
  title: 'Guilds',
  href: ROUTES.BOSSES.GUILDS,
  icon: <WeightIcon />,
  hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
  sprite: '/sprites/store/lasting exercise sword.gif',
}

export const routes: BossRoute[] = [Main, Tracker, Guilds]
