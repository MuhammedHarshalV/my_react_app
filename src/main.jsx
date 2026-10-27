import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Flip, ToastContainer } from "react-toastify"
import "./styles/fonts.css";
import "./styles/theme.css";

import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable transition={Flip}
    />
  </StrictMode>,
)
