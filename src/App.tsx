import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
import { RouteFallback } from './components/ui/RouteFallback'
import { Home } from './pages/Home'

const Calendar = lazy(() => import('./pages/Calendar').then((m) => ({ default: m.Calendar })))
const Clinics = lazy(() => import('./pages/Clinics').then((m) => ({ default: m.Clinics })))
const Coaches = lazy(() => import('./pages/Coaches').then((m) => ({ default: m.Coaches })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const Donate = lazy(() => import('./pages/Donate').then((m) => ({ default: m.Donate })))
const ExecutiveBoard = lazy(() =>
  import('./pages/ExecutiveBoard').then((m) => ({ default: m.ExecutiveBoard })),
)
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })))
const GetInvolved = lazy(() => import('./pages/GetInvolved').then((m) => ({ default: m.GetInvolved })))
const GetStarted = lazy(() => import('./pages/GetStarted').then((m) => ({ default: m.GetStarted })))
const Grants = lazy(() => import('./pages/Grants').then((m) => ({ default: m.Grants })))
const HallOfChampions = lazy(() =>
  import('./pages/HallOfChampions').then((m) => ({ default: m.HallOfChampions })),
)
const PracticeSchedule = lazy(() =>
  import('./pages/PracticeSchedule').then((m) => ({ default: m.PracticeSchedule })),
)
const ProductRegister = lazy(() =>
  import('./pages/ProductRegister').then((m) => ({ default: m.ProductRegister })),
)
const Sponsor = lazy(() => import('./pages/Sponsor').then((m) => ({ default: m.Sponsor })))
const Tournaments = lazy(() => import('./pages/Tournaments').then((m) => ({ default: m.Tournaments })))

const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })))
const AnnouncementsAdmin = lazy(() =>
  import('./pages/admin/AnnouncementsAdmin').then((m) => ({ default: m.AnnouncementsAdmin })),
)
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then((m) => ({ default: m.Dashboard })))
const EventsAdmin = lazy(() => import('./pages/admin/EventsAdmin').then((m) => ({ default: m.EventsAdmin })))
const GalleryAdmin = lazy(() => import('./pages/admin/GalleryAdmin').then((m) => ({ default: m.GalleryAdmin })))
const ProductsAdmin = lazy(() =>
  import('./pages/admin/ProductsAdmin').then((m) => ({ default: m.ProductsAdmin })),
)
const SponsorsAdmin = lazy(() =>
  import('./pages/admin/SponsorsAdmin').then((m) => ({ default: m.SponsorsAdmin })),
)
const TournamentsAdmin = lazy(() =>
  import('./pages/admin/TournamentsAdmin').then((m) => ({ default: m.TournamentsAdmin })),
)

function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/calendar"
          element={
            <LazyPage>
              <Calendar />
            </LazyPage>
          }
        />
        <Route
          path="/get-started"
          element={
            <LazyPage>
              <GetStarted />
            </LazyPage>
          }
        />
        <Route
          path="/get-involved"
          element={
            <LazyPage>
              <GetInvolved />
            </LazyPage>
          }
        />
        <Route
          path="/executive-board"
          element={
            <LazyPage>
              <ExecutiveBoard />
            </LazyPage>
          }
        />
        <Route
          path="/hall-of-champions"
          element={
            <LazyPage>
              <HallOfChampions />
            </LazyPage>
          }
        />
        <Route
          path="/faq"
          element={
            <LazyPage>
              <Faq />
            </LazyPage>
          }
        />
        <Route
          path="/grants"
          element={
            <LazyPage>
              <Grants />
            </LazyPage>
          }
        />
        <Route
          path="/clinics"
          element={
            <LazyPage>
              <Clinics />
            </LazyPage>
          }
        />
        <Route
          path="/coaches"
          element={
            <LazyPage>
              <Coaches />
            </LazyPage>
          }
        />
        <Route
          path="/practice-schedule"
          element={
            <LazyPage>
              <PracticeSchedule />
            </LazyPage>
          }
        />
        <Route
          path="/contact"
          element={
            <LazyPage>
              <Contact />
            </LazyPage>
          }
        />
        <Route
          path="/sponsor"
          element={
            <LazyPage>
              <Sponsor />
            </LazyPage>
          }
        />
        <Route
          path="/donate"
          element={
            <LazyPage>
              <Donate />
            </LazyPage>
          }
        />
        <Route
          path="/tournaments"
          element={
            <LazyPage>
              <Tournaments />
            </LazyPage>
          }
        />
        <Route
          path="/register/:slug"
          element={
            <LazyPage>
              <ProductRegister />
            </LazyPage>
          }
        />

        <Route
          path="/admin/login"
          element={
            <LazyPage>
              <AdminLogin />
            </LazyPage>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <LazyPage>
                <AdminLayout />
              </LazyPage>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <LazyPage>
                <Dashboard />
              </LazyPage>
            }
          />
          <Route
            path="announcements"
            element={
              <LazyPage>
                <AnnouncementsAdmin />
              </LazyPage>
            }
          />
          <Route
            path="tournaments"
            element={
              <LazyPage>
                <TournamentsAdmin />
              </LazyPage>
            }
          />
          <Route
            path="products"
            element={
              <LazyPage>
                <ProductsAdmin />
              </LazyPage>
            }
          />
          <Route
            path="gallery"
            element={
              <LazyPage>
                <GalleryAdmin />
              </LazyPage>
            }
          />
          <Route
            path="sponsors"
            element={
              <LazyPage>
                <SponsorsAdmin />
              </LazyPage>
            }
          />
          <Route
            path="events"
            element={
              <LazyPage>
                <EventsAdmin />
              </LazyPage>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
