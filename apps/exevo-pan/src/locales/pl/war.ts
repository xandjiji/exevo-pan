// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/war'
/* @ ToDo: i18n-pl */

export default defaultComposer(defaultTranslations, {
  Meta: {
    Overall: {
      title: 'Wojna na Libertabrze',
      description:
        'Śledź statystyki na żywo i informacje z wojny na Libertabrze!',
    },
    Top10: {
      title: 'Exevo Pan - Libertabra Wojenne High-score',
      description:
        'Sprawdź największych fraggerów, i największą ilość smierci z wojny na Libertabrze!',
    },
    GuildXP: {
      title:
        'Exevo Pan - Dzienne przyrosty ilości doświadczenia gildii na Libertabrze',
      description:
        'Porównuj dzienne zmiany ilości doświadczenia gildii z wojny na Libertabrze!',
    },
    Search: {
      title: 'Exevo Pan - Szukaj postaci',
      description:
        'Szukaj wszystkich postaci partycypujących w wojnie na Libertabrze!',
    },
  },
  Header: {
    Overall: 'Całkowicie',
    Top10: 'Top 10',
    GuildXP: 'Xp Gildii',
    Search: 'Szukaj członków',
  },
  PageTitle: 'Otrzymuj statystyki na żywo z wojny na Libertabrze!',
  GuildSummary: {
    linkText: 'Idź do strony gildii',
    diffTitleSuffix: 'Od ostatniej aktualizacji',
  },
  OverallGrid: {
    comparisonChartTitle:
      'Porównywanie całkowitej ilości członków online z gildii Pune i Bones Alliance w przeciągu ostatnich 4 godzin.',
    comparisonChartSuffix: 'Członkowie online',
    recentDeathsTitle: 'Ostatnie śmierci',
    LastFrags: {
      killedHeadColumn: 'Zabił',
      characterHeadColumnTitle: 'Posortuj według poziomu',
      timeDiffSuffix: 'minut temu',
    },
  },
  Top10Grid: {
    mostKillsTitle: 'Najwięcej zabójstw',
    mostKillsCaptionSuffix: 'Członkowie z największa ilością zabójstw',
    mostDeathsTitle: 'Najwięcej śmierci',
    mostDeathsCaptionSuffix: 'Członkowie z największą ilością śmierci',
    CharacterTable: {
      positionLabel: 'Pozycja w rankingu',
      deathsHeadColumn: 'Śmierci',
      killsTitle: 'Całkowite zabójstwa',
      deathsTitle: 'Całkowita ilość śmierci',
    },
  },
  GuildXPGrid: {
    comparisonChartTitle:
      'Porównywanie dzienny przyrost lub spadek doświadczenia pomiędzy Libertabra Pune i Bones Alliance',
    guildSummaryValueSuffix: 'Całkowita ilośc doświadczenia',
    comparisonChartSuffix: 'Różnica doświadczenia',
    ScoreboardXP: {
      summaryLabel: 'Dzisiejsze doświadzenie',
    },
  },
  SearchGrid: {
    Title: 'Wyszukaj członków gildii którzy walczą w wojnie!',
    MembersTable: {
      filters: 'Filtry',
      goatLabel: 'Kozak',
      skullLabel: 'Czaszka',
      searchLabel: 'Szukaj nazwy postaci',
      paginatorNoItems: 'Nie znaleziono nazwy postaci',
      levelSortLabel: 'Kliknij by posortować po poziomach',
      killsSortLabel: 'Kliknij by posortować po zabójstwach',
      deathSortLabel: 'Kliknij by posortować po śmierciach',
      deathsHeadColumn: 'Śmierci',
      killsTitle: 'Wszystkie zabójstwa',
      deathsTitle: 'Wszystkie śmierci',
      EmptyState: {
        p: 'Nie znaleziono postaci',
        alt: 'Nie znaleziono postaci',
      },
    },
  },
})
