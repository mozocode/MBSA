import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
import { Clinics } from './pages/Clinics'
import { Calendar } from './pages/Calendar'
import { Coaches } from './pages/Coaches'
import { Contact } from './pages/Contact'
import { ExecutiveBoard } from './pages/ExecutiveBoard'
import { Faq } from './pages/Faq'
import { GetInvolved } from './pages/GetInvolved'
import { GetStarted } from './pages/GetStarted'
import { Grants } from './pages/Grants'
import { HallOfChampions } from './pages/HallOfChampions'
import { Home } from './pages/Home'
import { PracticeSchedule } from './pages/PracticeSchedule'
import { Sponsor } from './pages/Sponsor'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AnnouncementsAdmin } from './pages/admin/AnnouncementsAdmin'
import { Dashboard } from './pages/admin/Dashboard'
import { EventsAdmin } from './pages/admin/EventsAdmin'
import { GalleryAdmin } from './pages/admin/GalleryAdmin'
import { SponsorsAdmin } from './pages/admin/SponsorsAdmin'
import { TournamentsAdmin } from './pages/admin/TournamentsAdmin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/executive-board" element={<ExecutiveBoard />} />
        <Route path="/hall-of-champions" element={<HallOfChampions />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/grants" element={<Grants />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/practice-schedule" element={<PracticeSchedule />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sponsor" element={<Sponsor />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="announcements" element={<AnnouncementsAdmin />} />
          <Route path="tournaments" element={<TournamentsAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="sponsors" element={<SponsorsAdmin />} />
          <Route path="events" element={<EventsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
