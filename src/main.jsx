import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRouter from './AppRouter.jsx'
import Modal from "react-modal";

// ✅ Set the app element for accessibility
Modal.setAppElement("#root");


createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AppRouter />
   </StrictMode>,
)
