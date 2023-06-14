// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/statistics'
/* @ ToDo: i18n-pl */

export default defaultComposer(defaultTranslations, {
  Meta: {
    Statistics: {
      title: 'Ogólne statystyki',
      description:
        'Statystyki, trendy i codzienna analiza danych z Tibijskiego Bazaru Postaci!',
    },
    Highscores: {
      title: 'Najlepsze wyniki',
      description:
        'Zobacz rankingi z największymi ofertami, najwyższymi levelami i najlepszymi skillami z Tibijskiego Bazaru Postaci!',
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
