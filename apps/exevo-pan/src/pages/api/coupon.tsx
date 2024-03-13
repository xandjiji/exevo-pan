import { ExevoPanIcon } from 'assets/svgs'
import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const font = fetch(
  new URL('../../assets/roboto.ttf', import.meta.url) as unknown as RequestInfo,
).then((res) => res.arrayBuffer())

export default async function handler({ url }: NextRequest) {
  const fontData = await font

  const { searchParams } = new URL(url)

  const couponValue = searchParams.get('name') ?? 'COUPON'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          border: '1px red dashed',
          padding: '12px 16px',
          borderRadius: 4,
        }}
      >
        <ExevoPanIcon width={60} height={60} style={{ flexShrink: 0 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <strong
            style={{
              fontSize: 18,
              whiteSpace: 'nowrap',
              textAlign: 'center',
              letterSpacing: '0.025em',
            }}
          >
            <strong className="rare-gradient-text">Exevo Pro</strong>{' '}
            <span
              style={{
                letterSpacing: '0.05em',
                textDecorationStyle: 'dashed',
                textUnderlineOffset: 4,
                textDecorationLine: 'underline',
              }}
              className="text-primaryHighlight decoration-primaryHighlight/60"
            >
              10% OFF
            </span>
          </strong>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 10,
                marginLeft: couponValue.length < 12 ? -16 : 0,
              }}
            >
              Using:
            </span>
            <span className="bg-primaryVariantHighlight/40 border-1 border-primaryHighlight/60 text-tsm text-onSurface rounded border-dashed px-2 py-1 font-bold">
              {couponValue}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 300,
      height: 90,
      fonts: [{ name: 'Roboto', data: fontData, style: 'normal' }],
    },
  )
}
