import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/war'

export default defaultComposer(defaultTranslations, {
  Meta: {
    Overall: {
      title: 'Libertabra War',
      description:
        '¡Siga los datos y estadísticas de guerra de Libertabra en vivo!',
    },
    Top10: {
      title: 'Exevo Pan - Libertabra War Rankings',
      description:
        'Ver el top frags e más muertes por la guerra de Libertabra!',
    },
    GuildXP: {
      title: 'Exevo Pan - Libertabra War Guild XP',
      description:
        '¡Compara las diferencias diarias de XP entre los guilds de guerra de Libertabra!',
    },
    Search: {
      title: 'Exevo Pan - Buscar personajes',
      description:
        '¡Busca a todos los personajes que luchan en la guerra de Libertabra!',
    },
  },
  Header: {
    Overall: 'General',
    Top10: 'Top 10',
    GuildXP: 'Guild XP',
    Search: 'Buscar personajes',
  },
  PageTitle: '¡Vea las estadísticas en vivo de la guerra de Libertabra!',
  GuildSummary: {
    linkText: 'Ir a la página de guild',
    diffTitleSuffix: 'desde la última actualización',
  },
  OverallGrid: {
    comparisonChartTitle:
      'Comparando el número de miembros de Libertabra Pune y Bones Alliance online en las últimas 4 horas',
    comparisonChartSuffix: 'miembros online',
    recentDeathsTitle: 'Muertes recientes',
    LastFrags: {
      killedHeadColumn: 'Muerto',
      characterHeadColumnTitle: 'Ordenado por level',
      timeDiffSuffix: 'minutos hace',
    },
  },
  Top10Grid: {
    mostKillsTitle: 'Más kills',
    mostKillsCaptionSuffix: 'miembros con más kills',
    mostDeathsTitle: 'Más muertes',
    mostDeathsCaptionSuffix: 'miembros com más muertes',
    CharacterTable: {
      positionLabel: 'Posición en el ranking',
      deathsHeadColumn: 'Muertes',
      killsTitle: 'Kills totales',
      deathsTitle: 'Muertes totales',
    },
  },
  GuildXPGrid: {
    comparisonChartTitle:
      'Comparación de la ganancia o pérdida diaria de XP entre Libertabra Pune y Bones Alliance',
    guildSummaryValueSuffix: 'XP total',
    comparisonChartSuffix: 'diferencia de XP',
    ScoreboardXP: {
      summaryLabel: 'XP de hoy',
    },
  },
  SearchGrid: {
    Title: '¡Busque miembros del gremio que luchen en la guerra de Libertabra!',
    MembersTable: {
      filters: 'Filtros',
      goatLabel: 'cabra',
      skullLabel: 'cráneo',
      searchLabel: 'Buscar por nickname',
      paginatorNoItems: 'Sin personajes',
      levelSortLabel: 'Haga clic para ordenar por Level',
      killsSortLabel: 'Haga clic para ordenar por Kills',
      deathSortLabel: 'Haga clic para ordenar por Mortes',
      deathsHeadColumn: 'Muertes',
      killsTitle: 'Kills totales',
      deathsTitle: 'Muertes totales',
      EmptyState: {
        p: 'No se encontraron personajes',
        alt: 'No se encontraron personajes',
      },
    },
  },
})
