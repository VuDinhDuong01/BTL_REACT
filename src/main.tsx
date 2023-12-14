import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { I18nextProvider } from 'react-i18next';
import { store } from "./store/store"
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import { ProviderContext } from './hooks/useContext.tsx'
import i18n from './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
    <ProviderContext>
      <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
      </BrowserRouter>
      </ProviderContext>
    </I18nextProvider>
  </React.StrictMode>,
)
