import { css } from 'styled-components'

const Reset = css`
  body {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  ul,
  ol {
    list-style-type: none;
  }
  ul,
  ol,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0;
  }
  fieldset {
    border: none;
    margin-inline-start: unset;
    margin-inline-end: unset;
    padding-block-start: unset;
    padding-inline-start: unset;
    padding-inline-end: unset;
    padding-block-end: unset;
    min-inline-size: unset;
  }
  figure {
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  button {
    padding: 0;
    border: none;
    background-color: transparent;
    font: unset;
  }
`

export default Reset
