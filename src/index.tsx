import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';

import { App } from './App';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { store } from './utilitys/store';
import i18n from './utilitys/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <App />
            </CssBaseline>
          </ThemeProvider>
        </Provider>
      </I18nextProvider>
    </HashRouter>
  </React.StrictMode>
);
