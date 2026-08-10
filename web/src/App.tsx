import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ProtectedRoute } from './components/ProtectedRoute'
import { RootRedirect } from './components/RootRedirect'
import { DrawPage } from './pages/DrawPage'
import { GalleryPage } from './pages/GalleryPage'
import { MansionDetailPage } from './pages/MansionDetailPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { TodayPage } from './pages/TodayPage'
import './app.css'
import './styles/tokens.css'
import './styles/motion.css'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<RootRedirect />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="today" element={<TodayPage />} />
          <Route path="draw" element={<DrawPage />} />
        </Route>
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="gallery/:mansionId" element={<MansionDetailPage />} />
        <Route path="*" element={<RootRedirect />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
