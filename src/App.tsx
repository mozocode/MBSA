import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Clinics } from './pages/Clinics'
import { Contact } from './pages/Contact'
import { ExecutiveBoard } from './pages/ExecutiveBoard'
import { Faq } from './pages/Faq'
import { GetStarted } from './pages/GetStarted'
import { Grants } from './pages/Grants'
import { HallOfChampions } from './pages/HallOfChampions'
import { Home } from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/executive-board" element={<ExecutiveBoard />} />
        <Route path="/hall-of-champions" element={<HallOfChampions />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/grants" element={<Grants />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
