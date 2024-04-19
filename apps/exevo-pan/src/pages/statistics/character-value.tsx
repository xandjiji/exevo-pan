import { useMemo, useState } from 'react'
import Head from 'next/head'
import { Main } from 'templates'
import { Line } from 'react-chartjs-2'
import { useTheme } from 'contexts/useTheme'
import { Header } from 'modules/Statistics'
import NextLink from 'next/link'
import { PreviewImageClient } from 'services'
import { GetStaticProps } from 'next'
import { Checkbox, Coupon, Input } from 'components/Atoms'
import { Select, Tooltip } from 'components/Organisms'
import {
  buildPageTitle,
  buildUrl,
  capitalizeFirstLetter,
  formatNumberWithCommas,
} from 'utils'
import { useTranslations } from 'contexts/useTranslation'
import { exevoPro, jsonld, routes } from 'Constants'
import { common, statistics } from 'locales'
import rawData from '../../character-value-data.json'
import options from '../../character-value-options.json'

type DataEntry = {
  year: number
  month: number
  vocation: 'knight' | 'paladin' | 'sorcerer' | 'druid'
  levelRange: number
  amount: number
  medianValue: number
}

type YearSummary = {
  year: number
  monthMedianValue: number[]
}

const characterValueData: DataEntry[] = rawData as DataEntry[]

const UTCMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const MIN_LEVEL = options.levelRanges[0]
const MAX_LEVEL = options.levelRanges[options.levelRanges.length - 1]

const CHART_COLORS = {
  2020: '#8338EC',
  2021: '#FFD166',
  2022: '#118AB2',
  2023: '#06D6A0',
  2024: '#EF476F',
  2025: '#8338EC',
  2026: '#8338EC',
  2027: '#8338EC',
}

const pageUrl = buildUrl(routes.STATISTICS)

function calculateWeightedAverage(values: number[], weights: number[]): number {
  if (values.length === 0) return 0

  const weightedSum = values.reduce(
    (acc, num, index) => acc + num * weights[index],
    0,
  )
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0)

  return weightedSum / totalWeight
}

const vocationOptions: Option[] = [
  { name: '-', value: '' },
  ...options.vocations.map((value) => ({
    name: capitalizeFirstLetter(value),
    value,
  })),
]

export default function Statistics() {
  const translations = useTranslations()

  const pageName = 'Estatísticas'
  const previewSrc = PreviewImageClient.getSrc({
    title: `${pageName} 📊`,
  })

  const pageTitle = buildPageTitle(pageName)

  const { colors } = useTheme()

  const [vocationFilter, setVocationFilter] = useState('')
  const [unsortedEnabledYears, setEnabledYears] = useState(options.years)
  const enabledYears = unsortedEnabledYears.sort((a, b) => a - b)

  const [minLevel, setMinLevel] = useState(MIN_LEVEL)
  const [maxLevel, setMaxLevel] = useState(MAX_LEVEL)

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 400,
        easing: 'easeOutCubic',
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      legend: {
        display: true,
        labels: {
          fontColor: colors.onSurface,
          boxWidth: 12,
        },
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: colors.onSurface,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              callback: (value: number) =>
                `${formatNumberWithCommas(value)} TC`,
              fontColor: colors.onSurface,
            },
            gridLines: {
              color: `${colors.separator}60`,
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: (tooltipItem: Record<string, string>[]) =>
            `${tooltipItem[0].xLabel} ${
              enabledYears[+tooltipItem[0].datasetIndex]
            }`,
          label: (tooltipItem: Record<string, number>) =>
            `Valor mediano: ${formatNumberWithCommas(tooltipItem.yLabel)} TC`,
        },
        displayColors: false,
      },
    }),
    [colors, enabledYears],
  )

  const yearSummaries: YearSummary[] = useMemo(() => {
    const queriedYears = options.years.filter((year) =>
      enabledYears.includes(year),
    )

    const list: YearSummary[] = []
    for (const year of queriedYears) {
      const summary: YearSummary = {
        year,
        monthMedianValue: UTCMonths.map(() => 0),
      }

      for (const month of UTCMonths) {
        const weights: number[] = []
        const medians: number[] = []
        for (const dataPoint of characterValueData) {
          if (dataPoint.year !== year) continue
          if (dataPoint.month !== month) continue
          if (vocationFilter && dataPoint.vocation !== vocationFilter) continue
          if (dataPoint.levelRange < minLevel) continue
          if (maxLevel >= MAX_LEVEL && dataPoint.levelRange > maxLevel - 1) {
            continue
          }

          weights.push(dataPoint.amount)
          medians.push(dataPoint.medianValue)
        }

        summary.monthMedianValue[month] = Math.round(
          calculateWeightedAverage(medians, weights),
        )
      }
      list.push(summary)
    }

    return list
  }, [vocationFilter, enabledYears, minLevel, maxLevel])

  const chartData = useMemo(
    () => ({
      labels: UTCMonths.map(
        (month) =>
          `${
            translations.common.Month[
              month.toString() as keyof typeof translations.common.Month
            ]
          }`,
      ),
      datasets: yearSummaries.map(({ year, monthMedianValue }) => ({
        label: year,
        data: monthMedianValue,
        fill: false,
        backgroundColor: CHART_COLORS[year as keyof typeof CHART_COLORS],
        borderColor: CHART_COLORS[year as keyof typeof CHART_COLORS],
      })),
    }),
    [colors, yearSummaries, translations.common],
  )

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.statistics.Meta.Statistics.description}
        />
        <meta
          property="twitter:description"
          content={translations.statistics.Meta.Statistics.description}
        />
        <meta
          property="og:description"
          content={translations.statistics.Meta.Statistics.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.STATISTICS, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.STATISTICS, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.STATISTICS, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Main>
        <main>
          <Header />
          <div className="container py-6">
            <div className="mb-8 flex justify-between gap-4">
              <h3 style={{ fontSize: 42 }}>Valor mediano de personagens</h3>

              <div className="flex shrink-0 items-start gap-4">
                <div className="mr-8">
                  <NextLink
                    href={`${routes.EXEVOPRO}?${exevoPro.referral.urlParam}=MP3PLAYER`}
                    className="text-onSurface text-xs font-light tracking-wider"
                  >
                    <Coupon coupon="MP3PLAYER" discount="20% OFF" />
                  </NextLink>
                  <p className="mt-2 text-right text-xs">
                    Oferta por tempo limitado
                  </p>
                </div>

                <Input
                  type="number"
                  step={100}
                  min={MIN_LEVEL}
                  max={maxLevel - 100}
                  label="Min level"
                  onChange={(e) => setMinLevel(+e.target.value)}
                  value={minLevel}
                />
                <Tooltip
                  content={<span>Level {MAX_LEVEL}+</span>}
                  placement="bottom-start"
                  trigger="none"
                  visible={maxLevel === MAX_LEVEL}
                >
                  <Input
                    type="number"
                    step={100}
                    min={minLevel + 100}
                    max={MAX_LEVEL}
                    label="Max level"
                    onChange={(e) => setMaxLevel(+e.target.value)}
                    value={maxLevel}
                    className="mb-3"
                  />
                </Tooltip>

                <Select
                  label="Filtrar vocação"
                  options={vocationOptions}
                  onChange={(e) => setVocationFilter(e.target.value)}
                  value={vocationFilter}
                  className="w-28"
                />

                <div className="grid gap-2">
                  {options.years.map((year) => {
                    const isChecked = enabledYears.includes(year)
                    return (
                      <Checkbox
                        label={year}
                        checked={isChecked}
                        disabled={isChecked && enabledYears.length <= 1}
                        onClick={() =>
                          setEnabledYears((prev) => {
                            if (!isChecked) return [...prev, year]
                            return prev.filter((y) => y !== year)
                          })
                        }
                      />
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="card h-[540px] px-[24px] py-[32px]">
              {/* @ts-ignore */}
              <Line key={+new Date()} data={chartData} options={chartOptions} />
            </div>
          </div>
        </main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      statistics: statistics[locale as RegisteredLocale],
    },
  },
})
