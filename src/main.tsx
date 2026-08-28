import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//VERIFICAR QUE TENGAMOS IMPORTADO EL INDEX.CSS
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
