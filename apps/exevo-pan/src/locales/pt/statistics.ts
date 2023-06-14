import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/statistics'

export default defaultComposer(defaultTranslations, {
  Meta: {
    Statistics: {
      title: 'Estatísticas gerais',
      description:
        'Estatísticas, tendências, análise de dados diários e informações históricas do Char Bazaar do Tibia!',
    },
    Highscores: {
      title: 'Rankings',
      description:
        'Veja rankings dos chares mais caros, top levels e maiores skills do Char Bazaar do Tibia!',
    },
  },
  Header: {
    Overall: 'Estatísticas gerais',
    Highscores: 'Rankings',
  },
  OverallGrid: {
    title: 'Estatísticas e análise de dados do Char Bazaar',
    Chart1: {
      totalLabel: 'Volume total',
      yesterdayLabel: 'Volume de ontem',
      tooltipLabel: 'Volume de Tibia Coins',
    },
    Chart2: {
      totalLabel: 'Receita total da Cipsoft',
      yesterdayLabel: 'Receita de ontem',
      tooltipLabel: 'Receita da Cipsoft',
    },
    PercentageCard1: {
      title: 'Taxa de sucesso de leilões',
    },
    PieChart1: {
      title: 'Distribuição de vocações',
    },
  },
  HighscoresGrid: {
    title: 'Rankings, top 10 personagens e recordes do Char Bazaar',
    top10BidTitle: 'Preço',
  },
  Days: 'dias',
  Summary: {
    positiveTrendLabel: 'Tendência de aumento',
    negativeTrendLabel: 'Tendência de queda',
  },
  List: {
    captionTop10: 'Ranking top 10 personagens por',
    captionDescription: 'Ranking de personagens',
    titleLabel: 'Posição no ranking',
  },
})
