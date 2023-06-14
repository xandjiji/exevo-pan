import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/war'

export default defaultComposer(defaultTranslations, {
  Meta: {
    Overall: {
      title: 'Libertabra War',
      description:
        'Acompanhe dados e estatísticas ao vivo da guerra de Libertabra!',
    },
    Top10: {
      title: 'Exevo Pan - Libertabra War Rankings',
      description:
        'Confira os top frags e mais mortes da guerra de Libertabra!',
    },
    GuildXP: {
      title: 'Exevo Pan - Libertabra War Guild XP',
      description:
        'Compare as diferenças diárias de XP entre as guilds da guerra de Libertabra!',
    },
    Search: {
      title: 'Exevo Pan - Procurar personagens',
      description:
        'Busque por todos os personagens lutando na guerra de Libertabra!',
    },
  },
  Header: {
    Overall: 'Geral',
    Top10: 'Top 10',
    GuildXP: 'Guild XP',
    Search: 'Procurar membros',
  },
  PageTitle: 'Veja estatísticas ao vivo da guerra de Libertabra!',
  GuildSummary: {
    linkText: 'Ir para a página da guild',
    diffTitleSuffix: 'desde a última atualização',
  },
  OverallGrid: {
    comparisonChartTitle:
      'Comparando o numero de membros online de Libertabra Pune e Bones Alliance nas últimas 4 horas',
    comparisonChartSuffix: 'membros online',
    recentDeathsTitle: 'Mortes recentes',
    LastFrags: {
      killedHeadColumn: 'Morto',
      characterHeadColumnTitle: 'Ordenado por level',
      timeDiffSuffix: 'minutos atrás',
    },
  },
  Top10Grid: {
    mostKillsTitle: 'Mais kills',
    mostKillsCaptionSuffix: 'membros com mais kills',
    mostDeathsTitle: 'Mais mortes',
    mostDeathsCaptionSuffix: 'membros com mais mortes',
    CharacterTable: {
      positionLabel: 'Posição no ranking',
      deathsHeadColumn: 'Mortes',
      killsTitle: 'Total de kills',
      deathsTitle: 'Total de mortes',
    },
  },
  GuildXPGrid: {
    comparisonChartTitle:
      'Comparando o ganho ou perda de XP diário entre Libertabra Pune e Bones Alliance',
    guildSummaryValueSuffix: 'XP total',
    comparisonChartSuffix: 'diferença de XP',
    ScoreboardXP: {
      summaryLabel: 'XP de hoje',
    },
  },
  SearchGrid: {
    Title: 'Procure por membros das guilds lutando na guerra de Libertabra!',
    MembersTable: {
      filters: 'Filtros',
      goatLabel: 'bode',
      skullLabel: 'caveira',
      searchLabel: 'Buscar por nickname',
      paginatorNoItems: 'Nenhum personagem encontrado',
      levelSortLabel: 'Clique para ordenar por Level',
      killsSortLabel: 'Clique para ordenar por Kills',
      deathSortLabel: 'Clique para ordenar por Mortes',
      deathsHeadColumn: 'Mortes',
      killsTitle: 'Total de kills',
      deathsTitle: 'Total de mortes',
      EmptyState: {
        p: 'Nenhum personagem encontrado',
        alt: 'Nenhum personagem foi encontrado',
      },
    },
  },
})
