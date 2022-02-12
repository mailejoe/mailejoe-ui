import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    touch-action: manipulation;
    height: 100%;
    min-height: 100%;
  }

  body {
    color: #333;
    overflow: hidden;
    margin: 0;
    padding: 0;
    background-color: white;
    height: 100%;
    min-height: 100%;
    -webkit-tap-highlight-color: transparent;
    line-height: 1.2;
    font-size: 13px;
    font-family: 'Source Sans Pro', sans-serif;
  }

  #content {
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
  }

  *, *:after, *:before, input[type="search"] {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  ul, li, ol, dd, h1, h2, h3, h4, h5, h6, p {
    padding: 0;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: bold;
  }

  button {
    background: none;
    border: none;
  }

  [role="button"], button, input, select, textarea {
    &:disabled {
      opacity: 1;
    }
  }
  [role="button"], button, input, textarea {
    appearance: none;
  }
  select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
  select::-ms-expand {
    display: none;
  }
  select option {
    color: #333;
  }

  textarea {
    line-height: 1.4285;
  }

  body, select {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
