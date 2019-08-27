import React from 'react';
import { node } from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CurrentFilmProvider from '../../contexts/CurrentFilmContext';
import theme from '../../theme';

const GlobalState = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CurrentFilmProvider>{children}</CurrentFilmProvider>
  </MuiThemeProvider>
);

GlobalState.propTypes = {
  children: node.isRequired
};

export default GlobalState;
