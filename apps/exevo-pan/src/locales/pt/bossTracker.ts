import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/bossTracker'

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Bosses',
    description: 'Descubra onde e quando bosses irão nascer!',
  },
  updated: {
    recently: 'Atualizado alguns minutos atrás',
    hoursAgo: {
      prefix: 'Atualizado',
      suffix: 'atrás',
    },
  },
  ServerNavigation: {
    label: 'Servidor selecionado:',
  },
  RecentlyAppeared: {
    title: 'Vistos recentemente',
    /* 'hours ago' */
    ago: 'atrás',
  },
  BossGrid: {
    pin: 'Favoritar este boss',
    unpin: 'Desfavoritar este boss',
    listBosses: 'Listar bosses por:',
    exclusiveBosses: 'Bosses exclusivos {{exevopro}} 🕵️',
    EmptyState: 'Nenhum boss',
    listOptions: {
      chance: 'Chance',
      name: 'Nome',
      lastSeen: 'Última vez visto',
      favorites: 'Favoritos',
    },
  },
})
