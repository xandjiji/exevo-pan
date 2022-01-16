import { css } from 'styled-components'

const backgroundA = css`
  background-image: linear-gradient(
      135deg,
      var(--primaryVariant) 25%,
      transparent 25%
    ),
    linear-gradient(225deg, var(--primaryVariant) 25%, transparent 25%),
    linear-gradient(45deg, var(--primaryVariant) 25%, transparent 25%),
    linear-gradient(315deg, var(--primaryVariant) 25%, transparent 25%);
  background-position: 10px 0, 10px 0, 0 0, 0 0;
  background-size: 20px 20px;
  background-repeat: repeat;
`

const backgroundB = css`
  background-image: linear-gradient(var(--primaryVariant) 2px, transparent 2px),
    linear-gradient(90deg, var(--primaryVariant) 2px, transparent 2px),
    linear-gradient(var(--primaryVariant) 1px, transparent 1px),
    linear-gradient(90deg, var(--primaryVariant) 1px, transparent 1px);
  background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
`

const backgroundC = css`
  background-image: linear-gradient(
      45deg,
      transparent 20%,
      var(--primaryVariant) 25%,
      transparent 25%
    ),
    linear-gradient(
      -45deg,
      transparent 20%,
      var(--primaryVariant) 25%,
      transparent 25%
    ),
    linear-gradient(
      -45deg,
      transparent 75%,
      var(--primaryVariant) 80%,
      transparent 0
    ),
    radial-gradient(var(--primaryVariant) 2px, transparent 0);
  background-size: 30px 30px, 30px 30px;
  background-color: var(--primaryVariantHighlight);
`

const backgroundD = css`
  background: radial-gradient(
      circle,
      transparent 20%,
      var(--primaryVariantHighlight) 20%,
      var(--primaryVariantHighlight) 80%,
      transparent 80%,
      transparent
    ),
    radial-gradient(
        circle,
        transparent 20%,
        var(--primaryVariantHighlight) 20%,
        var(--primaryVariantHighlight) 80%,
        transparent 80%,
        transparent
      )
      25px 25px,
    linear-gradient(var(--primaryVariant) 2px, transparent 2px) 0 -1px,
    linear-gradient(
        90deg,
        var(--primaryVariant) 2px,
        var(--primaryVariantHighlight) 2px
      ) -1px 0;
  background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px;
`

export const backgroundStyles = [
  backgroundA,
  backgroundB,
  backgroundC,
  backgroundD,
]
