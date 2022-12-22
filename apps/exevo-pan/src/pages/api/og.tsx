import { ImageResponse } from '@vercel/og'
import { ExevoPanIcon } from 'assets/svgs'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const font = fetch(
  new URL('../../assets/roboto.ttf', import.meta.url) as unknown as RequestInfo,
).then((res) => res.arrayBuffer())

const getFontSize = (title: string, fontParam?: string | null): number => {
  if (fontParam) return +fontParam

  const charCount = title.length

  if (charCount <= 10) return 180
  if (charCount <= 33) return 120
  if (charCount <= 51) return 88
  if (charCount <= 60) return 78

  return 64
}

export default async function handler({ url }: NextRequest) {
  const fontData = await font

  const { searchParams } = new URL(url)

  const title = searchParams.get('title') ?? 'Exevo Pan'
  const imgSrc = searchParams.get('img')
  const fontSize = getFontSize(title, searchParams.get('fontSize'))

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 64,
        }}
      >
        {!!imgSrc && (
          <img
            src={imgSrc}
            width={240 * 2}
            height={240 * 2}
            alt=""
            style={{
              position: 'absolute',
              right: -160,
              bottom: 0,
              opacity: 0.2,
            }}
          />
        )}
        <h1
          style={{
            fontSize,
            color: 'rgb(63,81,181)',
            marginBottom: 64,
          }}
        >
          {searchParams.get('title')}
        </h1>
        <div
          style={{
            position: 'absolute',
            left: 64,
            bottom: 64,
            display: 'flex',
            textAlign: 'center',
          }}
        >
          <ExevoPanIcon width={72} height={72} style={{ marginRight: 32 }} />
          <h1 style={{ fontSize: 54, lineHeight: 1, color: 'black' }}>
            Exevo Pan
          </h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [{ name: 'Roboto', data: fontData, style: 'normal' }],
    },
  )
}
