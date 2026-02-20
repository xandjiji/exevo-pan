import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/statistics'

export default defaultComposer(defaultTranslations, {
  Meta: {
    Statistics: {
      title: 'Estadísticas del Char Bazaar de Tibia',
      description:
        'Analítica diaria e histórica de subastas y precios del Char Bazaar de Tibia.',
    },
    Highscores: {
      title: 'Rankings del Char Bazaar de Tibia',
      description:
        'Rankings con mayores ofertas, top levels y mejores skills del Char Bazaar de Tibia.',
    },
  },
  Header: {
    Overall: 'Estadísticas generales',
    Highscores: 'Rankings',
  },
  OverallGrid: {
    title: 'Estadísticas y análisis de datos de Char Bazaar',
    Chart1: {
      totalLabel: 'Volumen total',
      yesterdayLabel: 'Volumen de ayer',
      tooltipLabel: 'Volumen de Tibia Coins',
    },
    Chart2: {
      totalLabel: 'Ingresos totales de Cipsoft',
      yesterdayLabel: 'Ingresos de ayer',
      tooltipLabel: 'Ingresos de Cipsoft',
    },
    PercentageCard1: {
      title: 'Tasa de éxito de la subasta',
    },
    PieChart1: {
      title: 'Distribución de vocaciones',
    },
  },
  HighscoresGrid: {
    title: 'Rankings, top 10 personajes y registros del Char Bazaar',
    top10BidTitle: 'Precio',
  },
  Days: 'dias',
  Summary: {
    positiveTrendLabel: 'Tendencia creciente',
    negativeTrendLabel: 'Tendencia a la baja',
  },
  List: {
    captionTop10: 'Ranking top 10 personajes por',
    captionDescription: 'Ranking de personajes',
    titleLabel: 'Posición no ranking',
  },
})
