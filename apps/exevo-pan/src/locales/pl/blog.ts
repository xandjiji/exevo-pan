// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/blog'
/* @ ToDo: i18n-pl */

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Blog',
    description:
      'Poradniki Tibia i Exevo Pan o Char Bazaar, bossach i kalkulatorach.',
    breadcrumbRoot: 'Home',
  },
  recentPosts: 'Ostatnie posty',
  Filters: {
    title: 'Filtry',
    mostRecentLabel: 'Najnowszy',
    searchLabel: 'Search',
    searchPlaceholder: 'Search for posts',
    tagsLabel: 'Tags',
  },
  PostGrid: {
    emptyMessage: 'Nie znaleziono postu',
  },
  Newsletter: {
    getOur: 'Zapisz się do',
    newsletter: 'newsletteru',
    for: 'aby otrzymywać najświeższe wiadomości!',
    emailPlaceholder: 'twój@email.com',
    buttonText: 'Zapisz się',
    message: {
      invalidEmail: 'Niepoprawny email',
      alreadyRegistered: 'Ten email jest już zarejestrowany',
      success: 'Dziękuję',
      generic: 'Coś poszło nie tak',
    },
  },
  Authors: {
    headline1: 'Podobała Ci się zawartość?',
    headline2: 'Wesprzyj autorów dając im Tibia Coiny',
    author: 'Autor',
  },
  Pillar: {},
  TranslationAlert: {
    content:
      'Ten post nie jest jeszcze dostępny w języku polskim! Możesz nam pomóc przetłumaczyć tę treść',
    link: 'tutaj',
  },
})
