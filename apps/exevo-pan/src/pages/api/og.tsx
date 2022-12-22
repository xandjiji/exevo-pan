import { ImageResponse } from '@vercel/og'
import { ExevoPanIcon } from 'assets/svgs'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const font = fetch(new URL('../../assets/roboto.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
)

export default async function handler({ url }: NextRequest) {
  const fontData = await font

  const { searchParams } = new URL(url)

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
          textAlign: 'center',
          justifyContent: 'center',
          padding: 64,
        }}
      >
        <img
          src={searchParams.get('img') ?? ''}
          width={240 * 2}
          height={240 * 2}
          alt=""
          style={{
            position: 'absolute',
            right: -160,
            opacity: 0.2,
          }}
        />
        <h1
          style={{
            fontSize: 120,
            color: 'rgb(63,81,181)',
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
