// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/statistics'
/* @ ToDo: i18n-pl */

export default defaultComposer(defaultTranslations, {
  Meta: {
    Statistics: {
      title: 'Statystyki Char Bazaar Tibia',
      description:
        'Codzienna i historyczna analiza aukcji oraz cen z Char Bazaar Tibia.',
    },
    Highscores: {
      title: 'Rankingi Char Bazaar Tibia',
      description:
        'Rankingi najwyższych ofert, top leveli i skilli z Char Bazaar Tibia.',
    },
  },
  Header: {
    Overall: 'Ogólny',
    Highscores: 'Najlepsze wyniki',
  },
  OverallGrid: {
    title: 'Dane statystyczne oraz analityczne Tibijskiego Bazaru Postaci',
    Chart1: {
      totalLabel: 'Całkowita ilość',
      yesterdayLabel: 'Wczorajsza ilość',
      tooltipLabel: 'Ilość Tibia Coinów',
    },
    Chart2: {
      totalLabel: 'Całkowity zarobek Cipsoftu',
      yesterdayLabel: 'Wczorajszy zarobek',
      tooltipLabel: 'Zarobek Cipsoftu',
    },
    PercentageCard1: {
      title: 'Odsetek udanych aukcji',
    },
    PieChart1: {
      title: 'Podział klas',
    },
  },
  HighscoresGrid: {
    title:
      'Top 10 postaci, rankingu i najlepszych wynikow z Tibijskiego Bazaru Postaci',
    top10BidTitle: 'Oferta',
  },
  Days: 'dni',
  Summary: {
    positiveTrendLabel: 'Trend wzrajastający',
    negativeTrendLabel: 'Trend spadający',
  },
  List: {
    captionTop10: 'Top 10',
    captionDescription: 'Ranking postaci',
    titleLabel: 'Pozycja w rankingu',
  },
})
