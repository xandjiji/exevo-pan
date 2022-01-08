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
  TIBIA: 'https://www.tibia.com',
  CIPSOFT: 'https://www.cipsoft.com',
  COINS_REF: 'https://tibiaforsale.com/produto/tibia-coins/?wpam_id=361',
  UNLICENSE: 'https://unlicense.org',
  KWAI_REF: 'https://s.kwai.app/s/RdhBQPPn',
}
