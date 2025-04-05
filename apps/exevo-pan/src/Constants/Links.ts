const isLocal =
  process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_FRONT_DEV

const LOCAL_HISTORY_ENDPOINT = 'http://localhost:3000'

export const links = {
  CANONICAL: isLocal ? LOCAL_HISTORY_ENDPOINT : 'https://exevopan.com',
  EMAIL: 'mailto:xandjiji@gmail.com',
  LINKEDIN: 'https://www.linkedin.com/in/xandjiji',
  GITHUB_PROFILE: 'https://github.com/xandjiji',
  GITHUB_REPOSITORY: 'https://github.com/xandjiji/exevo-pan',
  TIBIACLIPS: 'https://www.youtube.com/channel/UC2srmu0R5yNikl3cnfqcomQ',
  TIBIAMAPS: 'https://tibiamaps.io',
  TIBIA: 'https://www.tibia.com',
  CIPSOFT: 'https://www.cipsoft.com',
  UNLICENSE: 'https://unlicense.org',
  TIBIA_BLACKJACK: 'https://tbj.one/r/xand',
  EDGAR_TC: 'https://edgartc.mx/',
  REI_DOS_COINS: 'https://www.reidoscoins.com.br/?tracking=60b8120a1ab43',
  TIBIA_REFERRAL:
    'https://www.tibia.com/mmorpg/free-multiplayer-online-role-playing-game.php?taftoken=8b6dfcab-6353-4f07-b895-bf8716d007e1',
  PERSONAL_WEBSITE: 'https://xandjiji.com',
  I18N: 'https://docs.google.com/spreadsheets/d/1t0fEtS2DqumaL9r_m8FeYnZ9Szh0Ay2R-jhbBHo-SlM/edit?usp=sharing',
  WEBHOOK_DOCS:
    'https://github.com/xandjiji/exevo-pan/tree/master/apps/exevo-pan/src/modules/BossHunting/modules/HuntingGroups/webhooks.md',
  TIBIA_TRADE: 'https://tibiatrade.gg',
  BESTIARY_ARENA: 'https://bestiaryarena.com',
}
