import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import theme from './theme';

export default createGlobalStyle`
  ${normalize}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
  }

  body {
    background-color: ${theme.palette.background.default};
    font-family: ${theme.typography.fontFamily};
    color: ${theme.palette.text.primary};
  }
  
  #root {
    min-height: 100%;
    background-color: ${theme.palette.background.default};
    position: relative;
  }
`;
