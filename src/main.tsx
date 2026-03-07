import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx'
import './index.css'
import { LandingPage } from './pages/LandingPage/LandingPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx';
import { ManagerPage } from './pages/ManagerPage/ManagerPage.tsx';
import { CookiesUsagePage, PersonalDataPolicyPage, PersonalDataProcessingPage, ReceiveNewslettersPage } from './pages/Privacy';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='personal-data-processing' element={<PersonalDataProcessingPage />} />
        <Route path='personal-data-policy' element={<PersonalDataPolicyPage />} />
        <Route path='cookies-usage' element={<CookiesUsagePage />} />
        <Route path='receive-newsletters' element={<ReceiveNewslettersPage />} />
        <Route path='status' element={<App />} />
        <Route path='manager' element={<ManagerPage />} />
        <Route path='lp' element={<LandingPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
