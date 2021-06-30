import { createGlobalStyle } from 'styled-components'
import Reset from './Reset'

export default createGlobalStyle`
  ${Reset}
  
  html * {
    font-size: 12px;
  }

  html,
  body,
  #root {
    overflow-x: hidden;
  }

  html,
  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--background);
  }

  .pushable-item {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .pushable-item:not(.active) {
    transform: translateX(-110%) !important;
  }

  .light-theme {
    --background: #eeeeee;
    --surface: #ffffff;
    --onSurface: #000000;
    --separator: #b4b4b4;
    --primary: #3f51b5;
    --onPrimary: #ffffff;
    --primaryVariant: #c5cae9;
    --green: #377712;
    --red: #c51313;
    --alert: #f9eec1;
    --battleGreen: #43b600;
    --battleYellow: #ffdd00;
    --primaryVariantHighlight: #e7e8ee;
  }

  .dark-theme {
    --background: #202225;
    --surface: #36393f;
    --onSurface: #ffffff;
    --separator: #72767d;
    --primary: #9857e7;
    --onPrimary: #ffffff;
    --primaryVariant: #5e4480;
    --green: #5a9935;
    --red: #ff5b5b;
    --alert: #f9eec1;
    --battleGreen: #43b600;
    --battleYellow: #ffdd00;
    --primaryVariantHighlight: #714ca1;
  }

  svg {
    transition: fill 0.2s ease-out;
  }

  .custom-scrollbar::-webkit-scrollbar,
  html::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
    border-radius: 2px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb,
  html::-webkit-scrollbar-thumb {
    background-color: var(--primaryVariant);
    border-radius: 2px;
  }

  .custom-scrollbar,
  html {
    scrollbar-color: var(--primaryVariant) transparent;
    scrollbar-width: thin;
  }

  .shadow {
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.14);
  }

  .clickable {
    padding: 2px;
    border-radius: 4px;
    cursor: pointer;
    transition: box-shadow 0.2s ease-out;
  }

  .clickable:hover {
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.14);
  }

  .clickable:active,
  .clickable.active {
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
  }

  .container {
    margin-left: 20px;
    margin-right: 20px;
  }

  .negative-container {
    margin-left: -20px;
    margin-right: -20px;
  }

  .inner-container {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (min-width: 768px) {
    html * {
      font-size: 16px;
    }

    .container {
      margin-left: 40px;
      margin-right: 40px;
    }

    .negative-container {
      margin-left: -40px;
      margin-right: -40px;
    }

    .inner-container {
      padding-left: 40px;
      padding-right: 40px;
    }
  }
`
