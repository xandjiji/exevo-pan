// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/blog'
/* @ ToDo: i18n-es */

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Blog',
    description:
      'Aquí tenemos tutoriales, artículos y noticias sobre Tibia y Exevo Pan',
    breadcrumbRoot: 'Home',
  },
  recentPosts: 'Posts recientes',
  Filters: {
    title: 'Filtrar posts',
    mostRecentLabel: 'Más recientes',
    searchLabel: 'Buscar',
    searchPlaceholder: 'Buscar publicaciones',
    tagsLabel: 'Tags',
  },
  PostGrid: {
    emptyMessage: 'No se encontró ninguna publicación',
  },
  Newsletter: {
    getOur: '¡Subscribete a nuestra',
    newsletter: 'newsletter',
    for: 'y recibe todo el contenido nuevo!',
    emailPlaceholder: 'tu@email.com',
    buttonText: 'Subscribirse',
    message: {
      invalidEmail: 'Email inválido',
      alreadyRegistered: 'Este email ya está registrado',
      success: 'Gracias',
      generic: 'Algo salió mal',
    },
  },
  Authors: {
    headline1: '¿Te gustó este contenido?',
    headline2: 'Ayuda a los autores donando Tibia Coins',
    author: 'Autor',
    translator: 'Traductor',
  },
  Pillar: {
    title: 'Índice',
  },
  TranslationAlert: {
    content:
      '¡Esta publicación aún no está disponible en español! Puedes ayudarnos a traducir este contenido',
    link: 'aquí',
  },
})
