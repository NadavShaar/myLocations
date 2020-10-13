import React from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import lightTheme from './themes/light';

// Material-UI full theme referance
// https://material-ui.com/customization/default-theme/

const Theme = ({ children }) => (
  <ThemeProvider theme={lightTheme}>
    {children}
  </ThemeProvider>
);

export default Theme;