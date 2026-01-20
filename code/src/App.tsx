import Navbar from "./components/navbar/Navbar"
import { Route, Routes } from "react-router"
import Festival from "./pages/weekend/weekend"
import MentionLegales from "./pages/mention_legale/MentionLegales"
import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer"
import Billetterie from './pages/billetterie/billetterie'
import Programmation from './pages/programmation/programmation'
import AdminHome from "./pages/admin"
import Artist from "./pages/artists/Artist"


function App() {

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programmation" element={<Programmation />} />
        <Route path="/festival" element={< Festival />} />
        <Route path="/billetterie" element={<Billetterie />} />
        <Route path="/mention_legale" element={<MentionLegales />} />
        <Route path="/artist/:id" element={<Artist />} />
         <Route path="/admin" element={<AdminHome />} />
      </Routes>
      {/* <Routes>
        <Route path="/admin" element={<AdminHome />} />
      </Routes> */}

      <Footer />
    
    </div>
  )
}

export default App
