import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ArtistBanner from './components/artistbanner/artistbanner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ArtistBanner/>
import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <App />
    </BrowserRouter>
  </StrictMode>,
)