import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Design system — order matters: tokens → reset → type → global
import './styles/variables.css'
import './styles/reset.css'
import './styles/typography.css'
import './styles/global.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
