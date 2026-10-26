import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/fonts.css";
import "./styles/theme.css";

import App from './App.jsx'
import { AlertProvider } from "./components/common/alert/AlertProvider.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </StrictMode>,
)
