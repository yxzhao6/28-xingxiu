import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/noto-serif-sc/400.css'
import '@fontsource/noto-serif-sc/700.css'
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/500.css'
import App from './App.tsx'
import { BRAND_NAME } from './domain/brand'

document.title = BRAND_NAME

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
