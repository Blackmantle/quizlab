import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import * as styledComponents from 'styled-components';
import { switchProp, ifProp } from 'styled-tools';
import GlobalStyle from './GlobalStyle';

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
} = styledComponents;

export {
  styled,
  css,
  keyframes,
  MuiThemeProvider,
  ThemeProvider,
  GlobalStyle,
  switchProp,
  ifProp,
};

export { default } from './theme';
