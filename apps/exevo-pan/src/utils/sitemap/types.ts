export type UrlConfig = {
  locale?: string
  route: string
}

export type TemplateConfig = {
  date: Date
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'anual'
    | 'never'
  route: string
}
