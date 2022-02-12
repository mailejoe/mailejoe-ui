import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './GlobalStyles';
import NormalizeStyles from './NormalizeStyles';
import { CurrentUserContext, Provider as StateContext } from './state';
import { theme } from './Theme';
import { LanguageContext } from './translations';

import Layout from './Layout';

function App() {
  const nav = window.navigator as any;

  const browserLanguage = nav.userLanguage || nav.language;
  const [language, setLanguage] = useState<string>(browserLanguage.split('-')[0]);
  useEffect(() => {
    setLanguage(language);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CurrentUserContext.Provider value={null}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <StateContext>
            <NormalizeStyles />
            <GlobalStyles />
            <BrowserRouter><Layout /></BrowserRouter>
          </StateContext>
        </LanguageContext.Provider>
      </CurrentUserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
