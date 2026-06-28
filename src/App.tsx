import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Clinics } from './pages/Clinics'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </BrowserRouter>
  )
}
