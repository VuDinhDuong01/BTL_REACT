import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { store } from "./store/store"
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ProviderContext } from './hooks/useContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
        <ProviderContext>
          <App />
        </ProviderContext>
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
)
