import { createRoot } from 'react-dom/client'
// Polices du site d'origine, hébergées avec le site (pas de Google Fonts)
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/900.css'
import '@fontsource-variable/unbounded/wght.css'
import '@fontsource-variable/plus-jakarta-sans/wght.css'
import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
