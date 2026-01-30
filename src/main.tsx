import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx'
import './index.css'
import { LandingPage } from './pages/LandingPage/LandingPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='status' element={<App />} />
        <Route path='lp' element={<LandingPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
